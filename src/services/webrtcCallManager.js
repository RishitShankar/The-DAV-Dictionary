import { broadcastCallSignal } from './supabaseClient';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
  ]
};

class WebRTCCallManager {
  constructor() {
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.currentCallId = null;
    this.currentCallType = 'voice'; // 'voice' | 'video'
    this.iceCandidatesQueue = [];
    this.isInitiator = false;
    this.onRemoteStreamCallback = null;
    this.onLocalStreamCallback = null;
    this.onStatusChangeCallback = null;
  }

  // Get User Media (Microphone & Camera)
  async getMediaStream(callType = 'voice') {
    this.currentCallType = callType;
    const constraints = {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      },
      video: callType === 'video' ? {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      } : false
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.localStream = stream;
      if (this.onLocalStreamCallback) {
        this.onLocalStreamCallback(stream);
      }
      return stream;
    } catch (err) {
      console.warn('getUserMedia error:', err);
      // Fallback: If video failed or denied, try audio-only
      if (callType === 'video') {
        try {
          const audioOnly = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          this.localStream = audioOnly;
          if (this.onLocalStreamCallback) this.onLocalStreamCallback(audioOnly);
          return audioOnly;
        } catch (e2) {
          console.error('Microphone also failed:', e2);
          throw e2;
        }
      }
      throw err;
    }
  }

  // Create & configure RTCPeerConnection
  createPeerConnection(callId, localUser, remoteTarget) {
    if (this.peerConnection) {
      this.closePeerConnection();
    }

    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peerConnection = pc;
    this.currentCallId = callId;
    this.iceCandidatesQueue = [];

    // Attach local stream tracks to PC
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        pc.addTrack(track, this.localStream);
      });
    }

    // Handle receiving remote audio/video tracks
    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        this.remoteStream = event.streams[0];
        if (this.onRemoteStreamCallback) {
          this.onRemoteStreamCallback(event.streams[0]);
        }
      }
    };

    // Handle ICE Candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        broadcastCallSignal({
          type: 'ICE_CANDIDATE',
          callId: this.currentCallId,
          senderId: localUser?.id || 'caller',
          senderName: localUser?.name || 'User',
          targetId: remoteTarget?.id,
          targetName: remoteTarget?.name,
          candidate: event.candidate
        });
      }
    };

    pc.onconnectionstatechange = () => {
      if (this.onStatusChangeCallback) {
        this.onStatusChangeCallback(pc.connectionState);
      }
    };

    return pc;
  }

  // Initiate Outgoing Call (Caller)
  async startCall({ callId, callType, localUser, remoteContact, onLocalStream, onRemoteStream, onStatusChange }) {
    this.isInitiator = true;
    this.currentCallId = callId;
    this.currentCallType = callType;
    this.onLocalStreamCallback = onLocalStream;
    this.onRemoteStreamCallback = onRemoteStream;
    this.onStatusChangeCallback = onStatusChange;

    // 1. Capture local mic / camera
    const localStream = await this.getMediaStream(callType);

    // 2. Initialize RTCPeerConnection
    const pc = this.createPeerConnection(callId, localUser, remoteContact);

    // 3. Create Offer
    const offer = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: callType === 'video'
    });
    await pc.setLocalDescription(offer);

    // 4. Broadcast Call Offer to receiver device
    broadcastCallSignal({
      type: 'CALL_OFFER',
      callId,
      callType,
      sender: {
        id: localUser?.id || 'student',
        name: localUser?.name || 'Student',
        role: localUser?.role || 'Student',
        avatar: localUser?.dp || localUser?.avatar || ''
      },
      target: {
        id: remoteContact?.id,
        name: remoteContact?.name
      },
      offer: {
        type: offer.type,
        sdp: offer.sdp
      }
    });

    return { pc, localStream };
  }

  // Accept Incoming Call (Callee)
  async acceptCall({ signal, localUser, onLocalStream, onRemoteStream, onStatusChange }) {
    this.isInitiator = false;
    this.currentCallId = signal.callId;
    this.currentCallType = signal.callType || 'voice';
    this.onLocalStreamCallback = onLocalStream;
    this.onRemoteStreamCallback = onRemoteStream;
    this.onStatusChangeCallback = onStatusChange;

    // 1. Capture callee's mic / camera
    const localStream = await this.getMediaStream(signal.callType || 'voice');

    // 2. Initialize RTCPeerConnection
    const pc = this.createPeerConnection(signal.callId, localUser, signal.sender);

    // 3. Set Remote Description from caller's offer
    await pc.setRemoteDescription(new RTCSessionDescription(signal.offer));

    // Flush any pending ICE candidates
    while (this.iceCandidatesQueue.length > 0) {
      const candidate = this.iceCandidatesQueue.shift();
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.warn('Error adding queued candidate:', err);
      }
    }

    // 4. Create Answer
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    // 5. Broadcast Answer back to caller
    broadcastCallSignal({
      type: 'CALL_ANSWER',
      callId: signal.callId,
      sender: {
        id: localUser?.id || 'teacher',
        name: localUser?.name || 'Faculty'
      },
      target: {
        id: signal.sender?.id,
        name: signal.sender?.name
      },
      answer: {
        type: answer.type,
        sdp: answer.sdp
      }
    });

    return { pc, localStream };
  }

  // Process incoming answer (Caller receives Answer)
  async handleAnswer(answer) {
    if (!this.peerConnection) return;
    try {
      if (this.peerConnection.signalingState !== 'stable') {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }

      // Flush queued candidates
      while (this.iceCandidatesQueue.length > 0) {
        const candidate = this.iceCandidatesQueue.shift();
        try {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.warn('Error adding queued candidate:', err);
        }
      }
    } catch (err) {
      console.warn('handleAnswer error:', err);
    }
  }

  // Process incoming ICE Candidate
  async handleIceCandidate(candidate) {
    if (!candidate) return;
    if (this.peerConnection && this.peerConnection.remoteDescription) {
      try {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.warn('addIceCandidate error:', err);
      }
    } else {
      this.iceCandidatesQueue.push(candidate);
    }
  }

  // Toggle Microphone (Mute / Unmute)
  toggleMute(isMuted) {
    if (!this.localStream) return;
    this.localStream.getAudioTracks().forEach((track) => {
      track.enabled = !isMuted;
    });
  }

  // Toggle Camera (Video On / Off)
  toggleVideo(isVideoOff) {
    if (!this.localStream) return;
    this.localStream.getVideoTracks().forEach((track) => {
      track.enabled = !isVideoOff;
    });
  }

  // Hang Up and Clean Up all resources
  hangupCall(localUser, remoteContact) {
    try {
      if (this.currentCallId) {
        broadcastCallSignal({
          type: 'CALL_HANGUP',
          callId: this.currentCallId,
          senderId: localUser?.id,
          targetId: remoteContact?.id
        });
      }
    } catch (e) {}

    this.closePeerConnection();
  }

  closePeerConnection() {
    if (this.localStream) {
      try {
        this.localStream.getTracks().forEach((t) => t.stop());
      } catch (e) {}
      this.localStream = null;
    }
    if (this.peerConnection) {
      try {
        this.peerConnection.close();
      } catch (e) {}
      this.peerConnection = null;
    }
    this.remoteStream = null;
    this.currentCallId = null;
    this.iceCandidatesQueue = [];
  }
}

export const webrtcCallManager = new WebRTCCallManager();
