// DAVDixence Web Audio Synthesizer Engine
// High-fidelity algorithmic soundscapes and acoustic chimes for DAV Public School, Khabra
// Powered by standard Web Audio API - 100% offline, zero network dependencies.

class DavAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientSource = null;
    this.ambientGain = null;
    this.currentAmbientType = null;
    this.isMuted = false;
    this.masterVolume = 0.75;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // ==========================================
  // SCHOLASTIC & UI ACOUSTIC CHIMES
  // ==========================================

  playChime(type = 'success') {
    if (!this.init() || this.isMuted) return;

    const t = this.ctx.currentTime;

    if (type === 'success' || type === 'level_up') {
      // Arpeggiated Vedic victory harmonic: C5, E5, G5, C6
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);

        gain.gain.setValueAtTime(0, t + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.3, t + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.65);
      });
    } else if (type === 'bell' || type === 'assembly') {
      // Traditional Brass DAV Temple Bell chime (Concept #101)
      const fundamental = 587.33; // D5
      const partials = [1, 2.76, 5.4, 8.9];
      const partialGains = [0.4, 0.25, 0.15, 0.08];

      partials.forEach((mult, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * mult, t);

        const decay = 2.2 / (idx + 1);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(partialGains[idx], t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + decay + 0.1);
      });
    } else if (type === 'click' || type === 'tick') {
      // Crisp mechanical typewriter / pomodoro tick
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.03);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.04);
    } else if (type === 'meditation_bowl') {
      // Tibetan singing bowl for stress relief (Concept #164)
      const baseFreq = 261.63; // C4
      [1, 2.01, 3.01, 4.02].forEach((ratio, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * ratio, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.2 / (i + 1), t + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.00001, t + 4.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 4.6);
      });
    } else if (type === 'badge_unlock') {
      // Sparkly arpeggio
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);

        gain.gain.setValueAtTime(0.001, t + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.25, t + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.45);
      });
    }
  }

  // ==========================================
  // AMBIENT SOUNDSCAPE SYNTHESIS (Lo-Fi Study)
  // ==========================================

  startAmbient(ambientType = 'rain') {
    if (!this.init()) return;
    this.stopAmbient();

    const t = this.ctx.currentTime;
    this.currentAmbientType = ambientType;

    // Buffer length for noise looping (3 seconds stereo)
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);

    const left = noiseBuffer.getChannelData(0);
    const right = noiseBuffer.getChannelData(1);

    for (let i = 0; i < bufferSize; i++) {
      // White noise base
      left[i] = Math.random() * 2 - 1;
      right[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    this.ambientGain = this.ctx.createGain();

    if (ambientType === 'rain') {
      // Rain over Khabra: Low pass + Pink filter profile
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.gain.setValueAtTime(0.25, t);
    } else if (ambientType === 'campfire') {
      // Cozy study fireplace: Bandpass with crackle simulation
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, t);
      filter.Q.setValueAtTime(2.0, t);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.gain.setValueAtTime(0.3, t);
    } else if (ambientType === 'binaural_focus') {
      // Alpha wave 10Hz binaural beats for deep focus
      const oscL = this.ctx.createOscillator();
      const oscR = this.ctx.createOscillator();
      const merger = this.ctx.createChannelMerger(2);

      oscL.frequency.setValueAtTime(216, t);       // 216 Hz left
      oscR.frequency.setValueAtTime(226, t);       // 226 Hz right (10Hz beat difference)

      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);

      merger.connect(this.ambientGain);
      this.ambientGain.gain.setValueAtTime(0.18, t);

      oscL.start();
      oscR.start();
      this.ambientSource = {
        stop: () => {
          try {
            oscL.stop();
            oscR.stop();
          } catch(e) {}
        }
      };
      this.ambientGain.connect(this.masterGain);
      return;
    } else {
      // Default library whisper
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, t);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.gain.setValueAtTime(0.15, t);
    }

    whiteNoise.start();
    this.ambientSource = whiteNoise;
    this.ambientGain.connect(this.masterGain);
  }

  stopAmbient() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch (e) {}
      this.ambientSource = null;
    }
    this.currentAmbientType = null;
  }
}

export const davAudio = new DavAudioEngine();
