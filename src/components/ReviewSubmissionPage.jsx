import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, Mic, MicOff, Volume2, Video, FileText, Image as ImageIcon, 
  Upload, Trash2, CheckCircle2, AlertCircle, Sparkles, Send, 
  Play, Pause, RotateCcw, Clock, ShieldCheck, Heart, User, School, X
} from 'lucide-react';
import { submitDeveloperReview } from '../services/developerReviewsService';

const MAX_WORD_LIMIT = 677;

export function ReviewSubmissionPage({ currentUser, onSwitchToDonate }) {
  // Reviewer details
  const [studentName, setStudentName] = useState(currentUser?.name || 'Rishit Shankar');
  const [studentId, setStudentId] = useState(currentUser?.id || currentUser?.studentId || 'rishibhai');
  const [classNum, setClassNum] = useState(currentUser?.classNum || '8');
  
  // Review text
  const [reviewText, setReviewText] = useState('');
  
  // Voice Writing (Speech-to-Text / Dictation)
  const [isDictating, setIsDictating] = useState(false);
  const [dictationSupported, setDictationSupported] = useState(true);
  const recognitionRef = useRef(null);

  // Voice Review (Audio Recording with MediaRecorder)
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // Media / File Uploads
  const [attachedFiles, setAttachedFiles] = useState([]); // { name, type, size, dataUrl, kind: 'file' | 'video' | 'audio' | 'image' }
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Quick 5-Star Rating Modal Step
  const [isStarModalOpen, setIsStarModalOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState(null); // null if nothing given, or 1..5
  const [hoveredStars, setHoveredStars] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation message
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Calculate live word count
  const countWords = (text) => {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const currentWords = countWords(reviewText);
  const wordsLeft = MAX_WORD_LIMIT - currentWords;

  // Handle textarea change with strict word clamp
  const handleTextChange = (e) => {
    const newText = e.target.value;
    const wordCount = countWords(newText);
    
    if (wordCount > MAX_WORD_LIMIT) {
      // Trim to MAX_WORD_LIMIT words
      const words = newText.trim().split(/\s+/).slice(0, MAX_WORD_LIMIT);
      setReviewText(words.join(' '));
      setErrorMessage(`Maximum word limit of ${MAX_WORD_LIMIT} words reached.`);
    } else {
      setReviewText(newText);
      if (errorMessage) setErrorMessage('');
    }
  };

  // 2. Setup SpeechRecognition (Voice Writing)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setDictationSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English pronunciation friendly for DAV students

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }

        if (transcript.trim()) {
          setReviewText((prev) => {
            const combined = prev ? `${prev} ${transcript.trim()}` : transcript.trim();
            const words = countWords(combined);
            if (words > MAX_WORD_LIMIT) {
              return combined.trim().split(/\s+/).slice(0, MAX_WORD_LIMIT).join(' ');
            }
            return combined;
          });
        }
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e.error);
        setIsDictating(false);
      };

      recognition.onend = () => {
        setIsDictating(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      setDictationSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  const toggleVoiceWriting = () => {
    if (!recognitionRef.current) {
      alert('Speech-to-text dictation is not supported in this browser. Please use Chrome, Edge, or Android Chrome.');
      return;
    }

    if (isDictating) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsDictating(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsDictating(true);
        if (errorMessage) setErrorMessage('');
      } catch (e) {
        console.warn('Failed to start speech recognition:', e);
      }
    }
  };

  // 3. Audio Recording (Voice Review) using MediaRecorder
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setRecordedAudioUrl(reader.result);
          setRecordedAudioBlob(audioBlob);
        };
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecordingAudio(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Microphone permission is required to record a voice review. Please enable microphone access in your browser settings.');
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecordingAudio) {
      mediaRecorderRef.current.stop();
      setIsRecordingAudio(false);
      clearInterval(recordingTimerRef.current);
    }
  };

  const deleteRecordedAudio = () => {
    setRecordedAudioUrl(null);
    setRecordedAudioBlob(null);
    setRecordingSeconds(0);
    setIsPlayingAudio(false);
  };

  const togglePlayAudio = () => {
    if (!audioPlayerRef.current) return;
    if (isPlayingAudio) {
      audioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  // 4. File / Media Upload Handlers
  const handleFileUpload = (e, kind) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds 25MB limit. Please select a smaller file or short clip.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newAttachment = {
        id: 'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        kind: kind, // 'file' | 'video' | 'audio' | 'image'
        dataUrl: reader.result
      };
      setAttachedFiles(prev => [...prev, newAttachment]);
      e.target.value = ''; // Reset input
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = (attId) => {
    setAttachedFiles(prev => prev.filter(a => a.id !== attId));
  };

  // 5. Submit Flow: Open Star Rating Modal
  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!reviewText.trim() && !recordedAudioUrl && attachedFiles.length === 0) {
      setErrorMessage('Please write your review, record a voice review, or attach media before submitting.');
      return;
    }

    if (currentWords > MAX_WORD_LIMIT) {
      setErrorMessage(`Please keep your review within ${MAX_WORD_LIMIT} words.`);
      return;
    }

    setErrorMessage('');
    // Open quick 5-star rating popup
    setIsStarModalOpen(true);
  };

  // 6. Final Submit with Star Rating (or "nothing" if skipped)
  const handleConfirmReviewSubmission = async () => {
    setIsSubmitting(true);

    const newReview = {
      id: 'rev_' + Date.now(),
      studentName: studentName.trim(),
      studentId: studentId.trim() || 'student_' + Math.floor(Math.random() * 9000 + 1000),
      classNum: classNum || '8',
      reviewText: reviewText.trim(),
      wordCount: currentWords,
      // If user clicked a star: 1..5. If no star clicked / skipped: null (will display "nothing")
      rating: selectedStars,
      voiceAudioUrl: recordedAudioUrl || null,
      voiceAudioName: recordedAudioUrl ? `voice_review_${studentName.replace(/\s+/g, '_')}.webm` : null,
      videoUrl: attachedFiles.find(a => a.kind === 'video')?.dataUrl || null,
      videoName: attachedFiles.find(a => a.kind === 'video')?.name || null,
      attachments: attachedFiles,
      createdAt: new Date().toISOString(),
      readByDeveloper: false
    };

    try {
      await submitDeveloperReview(newReview);
      setIsSubmitting(false);
      setIsStarModalOpen(false);
      setSubmitSuccess(true);

      // Reset form
      setReviewText('');
      setRecordedAudioUrl(null);
      setRecordedAudioBlob(null);
      setAttachedFiles([]);
      setSelectedStars(null);
    } catch (err) {
      console.error('Error submitting review:', err);
      setIsSubmitting(false);
      alert('Review could not be saved to cloud. Please check your internet connection.');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner explaining Page 2 Review features */}
      <div className="rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 shadow-xl border border-amber-500/30 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Section 10 • Page 2: Student Review &amp; Voice Feedback Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Write or Speak Your Review for Rishit Shankar
          </h2>
          <p className="text-sm text-stone-300 mt-2 leading-relaxed">
            Share your experience, feature requests, or praise for the DAV Smart Portal. You can type up to <strong className="text-amber-300">677 words</strong> with live detection, use <strong className="text-amber-300">Voice Writing</strong>, record a <strong className="text-amber-300">Voice Review</strong>, or upload media clips!
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-amber-200">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Directly Delivered to Developer's Dimension 4 Desk
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-bold">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Quick 5-Star Interactive Rating on Submission
            </span>
          </div>
        </div>

        <div className="absolute right-4 bottom-2 opacity-15 pointer-events-none hidden md:block">
          <Star className="w-48 h-48 text-amber-400" />
        </div>
      </div>

      {/* Main Review Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        
        {/* Reviewer Details Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-red-800" />
              <span>Your Name / Reviewer</span>
            </label>
            <input 
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-800/40 focus:border-red-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-amber-700" />
              <span>DAV Class / Section</span>
            </label>
            <input 
              type="text"
              value={classNum}
              onChange={(e) => setClassNum(e.target.value)}
              placeholder="e.g. Class 8-D"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-600/40 focus:border-amber-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Student ID / Handle
            </label>
            <input 
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. dav801"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500/40"
            />
          </div>
        </div>

        {/* Text Review Area with Real-Time Word Detection & Voice Writing */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-800" />
              <span>Written Review (Maximum {MAX_WORD_LIMIT} Words)</span>
            </label>

            {/* Live Word Count Indicator without page refresh */}
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-black transition-colors ${
                wordsLeft <= 0 
                  ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                  : wordsLeft < 50
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {currentWords} / {MAX_WORD_LIMIT} words used • <strong>{Math.max(0, wordsLeft)} words left</strong>
              </span>

              {/* Voice Writing (Speech-to-Text) Toggle */}
              {dictationSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceWriting}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                    isDictating 
                      ? 'bg-rose-600 text-white animate-pulse' 
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                  }`}
                  title={isDictating ? 'Click to stop voice writing' : 'Click to speak and write automatically'}
                >
                  {isDictating ? (
                    <>
                      <MicOff className="w-3.5 h-3.5 text-white" />
                      <span>Listening... (Stop)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-amber-800" />
                      <span>🎙️ Voice Writing (Dictate)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={6}
              value={reviewText}
              onChange={handleTextChange}
              placeholder="Write your honest review, feedback, suggestions, or words of encouragement for developer Rishit Shankar here... As you type or speak, the system automatically detects words left in real-time."
              className="w-full p-4 rounded-2xl border border-slate-300 text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-slate-50/50"
            />
            
            {isDictating && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-rose-600/95 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Microphone active • Speak your thoughts</span>
              </div>
            )}
          </div>
        </div>

        {/* Voice Review Recording (MediaRecorder Audio Note) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border border-amber-200/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>Option: Record Voice Review (Audio Note)</span>
              </h4>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Record your voice speaking directly to Rishit Shankar. The developer will listen to your audio note!
              </p>
            </div>

            {/* Recording Controls */}
            <div className="flex items-center gap-2">
              {!isRecordingAudio && !recordedAudioUrl && (
                <button
                  type="button"
                  onClick={startAudioRecording}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Voice Recording</span>
                </button>
              )}

              {isRecordingAudio && (
                <button
                  type="button"
                  onClick={stopAudioRecording}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-md animate-pulse cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span>Stop Recording ({recordingSeconds}s)</span>
                </button>
              )}

              {recordedAudioUrl && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlayAudio}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? 'Pause Voice' : 'Play Voice Note'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={deleteRecordedAudio}
                    className="p-1.5 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 transition cursor-pointer"
                    title="Delete and re-record voice note"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <audio
                    ref={audioPlayerRef}
                    src={recordedAudioUrl}
                    onEnded={() => setIsPlayingAudio(false)}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {recordedAudioUrl && (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Voice Review attached successfully! Duration: {recordingSeconds > 0 ? `${recordingSeconds}s` : 'Audio clip ready'}</span>
            </div>
          )}
        </div>

        {/* Media & File Upload Section */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Upload className="w-4 h-4 text-slate-700" />
            <span>Option: Upload Media, Documents, Video, or Audio</span>
          </label>

          {/* 4 Dedicated Upload Triggers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Upload File */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-red-800/60 hover:bg-red-50/40 text-center transition cursor-pointer group"
            >
              <FileText className="w-5 h-5 mx-auto text-slate-600 group-hover:text-red-800 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold text-slate-700 block">Upload File</span>
              <span className="text-[10px] text-slate-400">PDF, DOC, TXT</span>
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".pdf,.doc,.docx,.txt" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'file')} 
            />

            {/* Upload Video */}
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="p-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-amber-600/60 hover:bg-amber-50/40 text-center transition cursor-pointer group"
            >
              <Video className="w-5 h-5 mx-auto text-slate-600 group-hover:text-amber-700 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold text-slate-700 block">Upload Video</span>
              <span className="text-[10px] text-slate-400">MP4, WebM (Max 25MB)</span>
            </button>
            <input 
              ref={videoInputRef} 
              type="file" 
              accept="video/*" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'video')} 
            />

            {/* Upload Audio */}
            <button
              type="button"
              onClick={() => audioInputRef.current?.click()}
              className="p-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-purple-600/60 hover:bg-purple-50/40 text-center transition cursor-pointer group"
            >
              <Volume2 className="w-5 h-5 mx-auto text-slate-600 group-hover:text-purple-700 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold text-slate-700 block">Upload Audio</span>
              <span className="text-[10px] text-slate-400">MP3, WAV, M4A</span>
            </button>
            <input 
              ref={audioInputRef} 
              type="file" 
              accept="audio/*" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'audio')} 
            />

            {/* Upload Media / Image */}
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-600/60 hover:bg-blue-50/40 text-center transition cursor-pointer group"
            >
              <ImageIcon className="w-5 h-5 mx-auto text-slate-600 group-hover:text-blue-700 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold text-slate-700 block">Upload Media</span>
              <span className="text-[10px] text-slate-400">JPG, PNG, WebP</span>
            </button>
            <input 
              ref={imageInputRef} 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'image')} 
            />
          </div>

          {/* List of Attached Files with Preview */}
          {attachedFiles.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase">Attached Files ({attachedFiles.length}):</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {attachedFiles.map(att => (
                  <div 
                    key={att.id}
                    className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      {att.kind === 'video' ? (
                        <Video className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : att.kind === 'audio' ? (
                        <Volume2 className="w-4 h-4 text-purple-600 shrink-0" />
                      ) : att.kind === 'image' ? (
                        <ImageIcon className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                      <span className="font-semibold text-slate-800 truncate">{att.name}</span>
                      <span className="text-[10px] text-slate-500 shrink-0">({att.size})</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeAttachment(att.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Remove attachment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error notification if validation fails */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Initial Submit Button (Triggers Step 2 Quick Star Rating Modal) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleInitialSubmit}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-800 via-amber-700 to-red-900 hover:from-red-700 hover:via-amber-600 hover:to-red-800 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition transform active:scale-98 cursor-pointer"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Submit Review → (Proceed to Quick Star Rating)</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToDonate}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            ← Back to Donate Page
          </button>
        </div>

      </div>

      {/* QUICK REVIEW FORM MODAL (5 Clickable Stars as requested by user) */}
      {isStarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white text-center shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsStarModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/40 mx-auto flex items-center justify-center mb-4">
              <Star className="w-8 h-8 fill-amber-400" />
            </div>

            <h3 className="text-2xl font-black text-amber-300 mb-1">
              Quick Review Rating
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              How would you rate Rishit Shankar's DAV Smart Portal? Tap any star below, or proceed without stars.
            </p>

            {/* 5 Interactive Clickable Stars */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const isLit = (hoveredStars || selectedStars || 0) >= starValue;
                return (
                  <button
                    key={starValue}
                    type="button"
                    onMouseEnter={() => setHoveredStars(starValue)}
                    onMouseLeave={() => setHoveredStars(0)}
                    onClick={() => {
                      // Toggle star: if clicking already selected, allow unselecting or set value
                      setSelectedStars(selectedStars === starValue ? null : starValue);
                    }}
                    className="p-1 transition transform hover:scale-125 focus:outline-none cursor-pointer"
                    title={`${starValue} Star${starValue > 1 ? 's' : ''}`}
                  >
                    <Star 
                      className={`w-9 h-9 sm:w-11 sm:h-11 transition-colors ${
                        isLit 
                          ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' 
                          : 'text-slate-600 hover:text-slate-400'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>

            {/* Star Rating Label or "Nothing" */}
            <div className="mb-6">
              {selectedStars ? (
                <div className="text-sm font-bold text-amber-300">
                  {selectedStars === 5 && '⭐⭐⭐⭐⭐ 5 Stars: Outstanding Masterpiece!'}
                  {selectedStars === 4 && '⭐⭐⭐⭐ 4 Stars: Very Good!'}
                  {selectedStars === 3 && '⭐⭐⭐ 3 Stars: Good & Helpful'}
                  {selectedStars === 2 && '⭐⭐ 2 Stars: Fair'}
                  {selectedStars === 1 && '⭐ 1 Star: Needs Improvement'}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">
                  No star selected (Rating will be submitted as <strong className="text-amber-400">nothing</strong>)
                </div>
              )}
            </div>

            {/* Review Summary Preview */}
            <div className="bg-slate-800/80 rounded-2xl p-3 text-left text-xs text-slate-300 mb-6 border border-slate-700">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">{studentName} ({classNum})</span>
                <span className="text-[10px] text-amber-400">{currentWords} words</span>
              </div>
              <p className="line-clamp-2 text-slate-400 italic">
                "{reviewText || (recordedAudioUrl ? '[Voice Review attached]' : '[Media review attached]')}"
              </p>
            </div>

            {/* Submit Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmReviewSubmission}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-black uppercase tracking-wider shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Saving Review to Vault...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Review Now</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsStarModalOpen(false)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel / Edit
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Celebratory Success Toast / Modal */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-md w-full p-6 text-white text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 mx-auto flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <h3 className="text-2xl font-black text-emerald-400 mb-2">
              Review Submitted Successfully!
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Thank you, <strong className="text-amber-300">{studentName}</strong>! Your review has been saved in the cloud and forwarded directly to Head Boy &amp; Developer Rishit Shankar's Dimension 4 desk (Section 12).
            </p>

            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider shadow-md cursor-pointer"
            >
              Done / Return to Reviews
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
