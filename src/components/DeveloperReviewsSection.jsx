import React, { useState, useEffect } from 'react';
import { 
  Star, MessageSquare, Volume2, Video, FileText, User, 
  Sparkles, RefreshCw, Trash2, CheckCircle2, AlertCircle, 
  Play, Pause, ExternalLink, ShieldCheck, Award, ArrowLeft,
  Calendar, Eye, Download, Search, X
} from 'lucide-react';
import { getDeveloperReviews, deleteDeveloperReview } from '../services/developerReviewsService';

export function DeveloperReviewsSection({ currentUser, onGoToSection }) {
  const isDeveloper = Boolean(
    currentUser?.isAdmin || 
    currentUser?.id === 'rishibhai' || 
    currentUser?.studentId === 'rishibhai' || 
    currentUser?.dimension === 4 || 
    currentUser?.plan === 'developer'
  );

  // Flow State: 
  // User Requirement: "First, if I click on section 12, then a page will open in the middle, it will be written check the reviews."
  // When clicked: view switches to 'list' showing person's name, review, and total number of stars (or "nothing").
  const [hasClickedCheckReviews, setHasClickedCheckReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Detailed Preview Modal State
  // User Requirement: "and if I click on have detailed preview, then the message that he has written will be shown to me."
  const [activeDetailedReview, setActiveDetailedReview] = useState(null);

  // Audio playback state inside detailed preview or cards
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [audioElements, setAudioElements] = useState({});

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const data = await getDeveloperReviews();
      setReviews(data);
    } catch (e) {
      console.warn('Failed loading reviews:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();

    const handleUpdate = () => {
      loadReviews();
    };
    window.addEventListener('dav_developer_reviews_updated', handleUpdate);
    return () => window.removeEventListener('dav_developer_reviews_updated', handleUpdate);
  }, []);

  const handleDelete = async (id, name, e) => {
    e.stopPropagation();
    if (!window.confirm(`Developer Action: Delete review from "${name}"?`)) return;
    try {
      const updated = await deleteDeveloperReview(id);
      setReviews(updated);
      if (activeDetailedReview?.id === id) {
        setActiveDetailedReview(null);
      }
    } catch (err) {
      alert('Could not delete review');
    }
  };

  const handleTogglePlayAudio = (id, audioUrl, e) => {
    e?.stopPropagation();
    if (playingAudioId === id) {
      audioElements[id]?.pause();
      setPlayingAudioId(null);
    } else {
      // Pause any previous
      if (playingAudioId && audioElements[playingAudioId]) {
        audioElements[playingAudioId].pause();
      }
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => setPlayingAudioId(null);
      setAudioElements(prev => ({ ...prev, [id]: audio }));
      setPlayingAudioId(id);
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (r.studentName && r.studentName.toLowerCase().includes(term)) ||
      (r.reviewText && r.reviewText.toLowerCase().includes(term)) ||
      (r.classNum && r.classNum.toLowerCase().includes(term))
    );
  });

  // Non-developer security gatekeeper
  if (!isDeveloper) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/40 rounded-3xl p-8 text-white text-center shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 border border-red-400/40 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/30">
              Dimension 4 Developer Desk Only
            </span>
            <h2 className="text-2xl font-black text-amber-300 mt-2">
              Section 12: Developer Reviews Vault
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              This section is reserved exclusively for Master Developer Rishit Shankar to inspect incoming student reviews, voice recordings, and ratings from Section 10.
            </p>
          </div>
          <button
            onClick={() => onGoToSection && onGoToSection(10)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-black uppercase tracking-wider shadow-lg cursor-pointer transition"
          >
            ← Return to Section 10: Donate &amp; Reviews Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-rose-50/30 to-slate-100/90 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 shadow-2xl border border-amber-500/30 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Section 12 • Dimension 4 Developer Only Review Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Welcome, Developer Rishit Shankar
            </h1>
            <p className="text-sm text-stone-300 mt-2 leading-relaxed">
              Live incoming reviews submitted by DAV students and community members on Section 10. All messages, voice recordings, videos, and 5-star ratings are securely synchronized to your Dimension 4 portal.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-amber-200">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Dimension 4 Master Developer Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-bold">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                {reviews.length} Total Reviews in Database
              </span>
            </div>
          </div>

          <div className="absolute right-4 bottom-2 opacity-15 pointer-events-none hidden md:block">
            <Award className="w-56 h-56 text-amber-400" />
          </div>
        </div>

        {/* STEP 1: INITIAL STATE (In the Middle: "Check the Reviews" button) */}
        {/* User Requirement: "First, if I click on section 12, then a page will open in the middle, it will be written check the reviews." */}
        {!hasClickedCheckReviews ? (
          <div className="flex items-center justify-center py-12 sm:py-20 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-amber-400/60 max-w-lg w-full text-center space-y-6 transform hover:scale-102 transition duration-300 card-super-interactive border-halo-gold ultra-shimmer animate-glow-gold">
              
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30">
                <MessageSquare className="w-10 h-10 animate-pulse" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-black uppercase tracking-wider">
                  Dimension 4 Person Only
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Check the Reviews
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Click below to inspect student names, review messages, voice recordings, and star ratings submitted on Section 10.
                </p>
              </div>

              {/* THE BUTTON: "Check the Reviews" */}
              <button
                type="button"
                onClick={() => setHasClickedCheckReviews(true)}
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-red-800 via-amber-600 to-red-900 hover:from-red-700 hover:via-amber-500 hover:to-red-800 text-white font-black text-base uppercase tracking-wider shadow-xl hover:shadow-2xl transition transform active:scale-98 cursor-pointer flex items-center justify-center gap-3"
              >
                <Eye className="w-5 h-5 text-amber-300" />
                <span>Check the Reviews ({reviews.length})</span>
              </button>

              <div className="pt-2 text-[11px] text-slate-400 font-semibold flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Supabase Cloud Sync Active</span>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: REVIEWS DASHBOARD */
          /* User Requirement: "After that, if I click on check reviews, then the person's name, then his review, and then his total number of stars if given. If he has given nothing, it will be written nothing in the stars only. It will be written for me, and if I click on have detailed preview, then the message that he has written will be shown to me." */
          <div className="space-y-6 animate-fadeIn">
            
            {/* Action Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setHasClickedCheckReviews(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                  title="Back to center screen"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, class, or text..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={loadReviews}
                  disabled={isLoading}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh Cloud Reviews</span>
                </button>

                <button
                  type="button"
                  onClick={() => onGoToSection && onGoToSection(10)}
                  className="px-3.5 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Go to Section 10</span>
                </button>
              </div>
            </div>

            {/* List of Reviews */}
            {filteredReviews.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-md">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">No Reviews Found</h3>
                <p className="text-xs text-slate-500">
                  {searchTerm ? 'No reviews matched your search filter.' : 'No reviews have been submitted yet on Section 10.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReviews.map((rev) => {
                  const hasStars = rev.rating !== null && rev.rating !== undefined && rev.rating > 0;
                  
                  return (
                    <div 
                      key={rev.id}
                      className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 hover:border-amber-400/80 transition flex flex-col justify-between space-y-4 group relative"
                    >
                      {/* Top Header: Person's Name & Details */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-800 to-amber-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                              {rev.studentName ? rev.studentName.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <div>
                              {/* Person's Name */}
                              <h3 className="text-base font-black text-slate-900 group-hover:text-red-900 transition">
                                {rev.studentName || 'Anonymous Student'}
                              </h3>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                <span>{rev.classNum ? `Class ${rev.classNum}` : 'DAV Student'}</span>
                                <span>•</span>
                                <span>ID: {rev.studentId}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleDelete(rev.id, rev.studentName, e)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete this review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* STARS DISPLAY: "then his total number of stars if given. If he has given nothing, it will be written nothing in the stars only." */}
                        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 my-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            Total Number of Stars:
                          </span>

                          <div>
                            {hasStars ? (
                              <div className="flex items-center gap-1.5">
                                <div className="flex text-amber-400">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star 
                                      key={s} 
                                      className={`w-4 h-4 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs font-black text-amber-600">
                                  ({rev.rating} / 5 Stars)
                                </span>
                              </div>
                            ) : (
                              /* EXACT USER REQUIREMENT: "If he has given nothing, it will be written nothing in the stars only." */
                              <span className="text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 uppercase tracking-wider">
                                nothing
                              </span>
                            )}
                          </div>
                        </div>

                        {/* HIS REVIEW (Review Excerpt) */}
                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal line-clamp-3 bg-white p-2 rounded-xl">
                          {rev.reviewText ? (
                            `"${rev.reviewText}"`
                          ) : (
                            <span className="italic text-slate-400">[Voice note or media review attached]</span>
                          )}
                        </div>

                        {/* Badges for Voice Audio, Video, or Attachments */}
                        <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-slate-100 text-[11px]">
                          {rev.voiceAudioUrl && (
                            <button
                              type="button"
                              onClick={(e) => handleTogglePlayAudio(rev.id, rev.voiceAudioUrl, e)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 font-bold hover:bg-purple-100 transition cursor-pointer"
                            >
                              {playingAudioId === rev.id ? <Pause className="w-3 h-3 text-purple-700" /> : <Play className="w-3 h-3 text-purple-700" />}
                              <span>{playingAudioId === rev.id ? 'Pause Voice Note' : 'Voice Review (Audio)'}</span>
                            </button>
                          )}

                          {rev.videoUrl && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                              <Video className="w-3 h-3 text-amber-700" />
                              <span>Video Attached</span>
                            </span>
                          )}

                          {rev.attachments && rev.attachments.length > 0 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 font-bold">
                              <FileText className="w-3 h-3 text-blue-700" />
                              <span>{rev.attachments.length} File(s)</span>
                            </span>
                          )}

                          <span className="text-slate-400 ml-auto flex items-center gap-1 text-[10px]">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                          </span>
                        </div>
                      </div>

                      {/* USER REQUIREMENT: "and if I click on have detailed preview, then the message that he has written will be shown to me." */}
                      <button
                        type="button"
                        onClick={() => setActiveDetailedReview(rev)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-600 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition transform active:scale-98 cursor-pointer mt-2"
                      >
                        <Eye className="w-4 h-4 text-amber-300" />
                        <span>Have Detailed Preview</span>
                      </button>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>

      {/* DETAILED PREVIEW MODAL */}
      {/* User Requirement: "and if I click on have detailed preview, then the message that he has written will be shown to me." */}
      {activeDetailedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveDetailedReview(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center font-black text-lg shadow-lg">
                {activeDetailedReview.studentName?.charAt(0).toUpperCase() || 'S'}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Detailed Review Preview
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {activeDetailedReview.studentName}
                </h3>
                <p className="text-xs text-slate-400">
                  Class: {activeDetailedReview.classNum} • Student ID: {activeDetailedReview.studentId} • Submitted: {new Date(activeDetailedReview.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Total Stars Field */}
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 mb-5 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Total Number of Stars:
              </span>
              <div>
                {activeDetailedReview.rating ? (
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-5 h-5 ${s <= activeDetailedReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-black text-amber-400">
                      ({activeDetailedReview.rating} / 5 Stars)
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-black text-rose-400 bg-rose-950/80 px-3 py-1 rounded-xl border border-rose-500/40 uppercase tracking-wider">
                    nothing
                  </span>
                )}
              </div>
            </div>

            {/* THE WRITTEN MESSAGE (FULL TEXT) */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>The Message That He Has Written</span>
                </label>
                <span className="text-[11px] text-slate-400 font-semibold">
                  Word Count: {activeDetailedReview.wordCount || (activeDetailedReview.reviewText ? activeDetailedReview.reviewText.trim().split(/\s+/).filter(Boolean).length : 0)} / 677 words
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm text-slate-100 leading-relaxed whitespace-pre-wrap selection:bg-amber-400 selection:text-slate-900">
                {activeDetailedReview.reviewText || (
                  <span className="text-slate-500 italic">No written text provided (Reviewer used voice or media attachments).</span>
                )}
              </div>
            </div>

            {/* Voice Review Audio Player (if recorded or uploaded) */}
            {activeDetailedReview.voiceAudioUrl && (
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 mb-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-purple-400" />
                    <span>Attached Voice Review (Audio Note)</span>
                  </span>
                  <span className="text-[10px] text-purple-400">Voice Note</span>
                </div>
                <audio 
                  controls 
                  src={activeDetailedReview.voiceAudioUrl} 
                  className="w-full rounded-xl bg-purple-900/50" 
                />
              </div>
            )}

            {/* Video Player (if video was attached) */}
            {activeDetailedReview.videoUrl && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 mb-5 space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>Attached Video Clip ({activeDetailedReview.videoName || 'Video'})</span>
                </span>
                <video 
                  controls 
                  src={activeDetailedReview.videoUrl} 
                  className="w-full rounded-2xl max-h-64 object-contain bg-black border border-slate-700"
                />
              </div>
            )}

            {/* Other Attached Files */}
            {activeDetailedReview.attachments && activeDetailedReview.attachments.length > 0 && (
              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">
                  Additional Attached Media &amp; Files ({activeDetailedReview.attachments.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDetailedReview.attachments.map((att, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="truncate pr-2">
                        <span className="font-bold text-white block truncate">{att.name}</span>
                        <span className="text-[10px] text-slate-400">{att.size} • {att.kind}</span>
                      </div>
                      <a
                        href={att.dataUrl}
                        download={att.name}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-amber-500 hover:text-slate-950 transition cursor-pointer"
                        title="Download file"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveDetailedReview(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                Close Preview
              </button>

              <button
                type="button"
                onClick={(e) => handleDelete(activeDetailedReview.id, activeDetailedReview.studentName, e)}
                className="py-3 px-4 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Delete Review</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
