import fs from 'fs';

let code = fs.readFileSync('src/components/TeachersSection.jsx', 'utf8');

// Find the homework full screen block
const hwStartMarker = "activePage === 'homework' && (\n              <div className=\"w-full space-y-6 animate-fadeIn\">";
const nextTabMarker = "activePage === 'doubts_chat' && (";

const hwStartIdx = code.indexOf(hwStartMarker);
const nextTabIdx = code.indexOf(nextTabMarker, hwStartIdx);

if (hwStartIdx === -1 || nextTabIdx === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const newHwJsxBlock = `activePage === 'homework' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Gen Z Hero Graphical Banner with Emerald/Amber Theme */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-stone-950 to-emerald-950 border-2 border-amber-400/60 p-5 sm:p-8 md:p-10 shadow-2xl card-real-3d">
                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-xs font-mono font-bold text-amber-300 animate-hw-badge-pulse">
                      <ClipboardList className="w-3.5 h-3.5 text-amber-300 animate-hw-calendar-spin" />
                      <span>PAGE 1 • DAILY HOMEWORK &amp; SYLLABUS DIRECTIVE</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight text-3d-mega animate-3d-float">
                      Daily Homework Hub <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent">Class &amp; Section Manager</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl font-medium">
                      Select your Class (LKG to Class 8) and Section (A to E) to review daily curriculum assignments, textbook exercise citations, audio voice readouts, and submission deadlines.
                    </p>

                    {/* Permission-Gated Action Button */}
                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      {isDimension5 ? (
                        <button
                          onClick={() => {
                            setEditingHwId(null);
                            setNewHwClass(selectedHwClass);
                            setNewHwSection(selectedHwSection);
                            setNewHwSubject(getHomeworkSubjectsForClass(selectedHwClass)[0]);
                            setNewHwTitle('');
                            setNewHwDesc('');
                            setNewHwChapter('');
                            setNewHwMediaList([]);
                            setShowAssignHwModal(true);
                          }}
                          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-2xl shadow-amber-500/40 transition transform hover:scale-105 active:scale-95 cursor-pointer card-real-3d animate-hw-publish-glow min-h-[46px]"
                        >
                          <Plus className="w-4 h-4 text-stone-950" />
                          <span>Publish New Homework to Students</span>
                        </button>
                      ) : (
                        <div className="px-5 py-2.5 rounded-xl bg-stone-900 border border-amber-400/40 text-amber-300 font-mono text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Student Mode: Daily Homework Viewer</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Class & Section Selector Controls */}
                <div className="w-full space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <label className="text-xs font-black uppercase text-amber-400 font-mono tracking-wider">
                        Step 1: Select Academic Class (Nursery, LKG, UKG, 1 to 8)
                      </label>
                      <span className="text-[11px] text-stone-400 font-mono">
                        Active Class: <strong className="text-amber-300">Class {selectedHwClass}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-1.5 sm:gap-2">
                      {SCHOOL_CLASSES_CONFIG.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedHwClass(c.id);
                            playSoundChime('sent');
                          }}
                          className={\`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border min-h-[42px] animate-hw-pill-float \${
                            selectedHwClass === c.id
                              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 border-amber-200 shadow-lg scale-105'
                              : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-amber-400 hover:text-amber-300'
                          }\`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>

                    {/* Step 2: Select Section */}
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-stone-800">
                      <label className="text-xs font-black uppercase text-amber-400 font-mono tracking-wider">
                        Step 2: Select Section (A, B, C, D, E)
                      </label>
                      <span className="text-[11px] text-stone-400 font-mono">
                        Active Cohort: <strong className="text-emerald-400">Class {selectedHwClass} - Section {selectedHwSection}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 max-w-md">
                      {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                        <button
                          key={sec}
                          onClick={() => {
                            setSelectedHwSection(sec);
                            playSoundChime('sent');
                          }}
                          className={\`py-2 rounded-xl text-xs font-black transition cursor-pointer border min-h-[40px] \${
                            selectedHwSection === sec
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-300 shadow-md scale-105'
                              : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-emerald-400 hover:text-emerald-300'
                          }\`}
                        >
                          Section {sec}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Homework Cards */}
                  {(() => {
                    const filtered = homeworkStore.filter(
                      h => h.classId === selectedHwClass && h.section === selectedHwSection
                    );

                    if (filtered.length === 0) {
                      return (
                        <div className="p-8 sm:p-12 text-center rounded-3xl bg-stone-900/60 border border-stone-800 space-y-3">
                          <ClipboardList className="w-12 h-12 text-amber-400/50 mx-auto animate-float-icon" />
                          <h4 className="text-base sm:text-lg font-black text-white">
                            No Homework Assigned Yet for Class {selectedHwClass} - Section {selectedHwSection}
                          </h4>
                          <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                            Faculty of Class {selectedHwClass} - Section {selectedHwSection} have not posted an assignment yet. Please select another class/section or check back later!
                          </p>
                          {isDimension5 && (
                            <button
                              onClick={() => {
                                setEditingHwId(null);
                                setNewHwClass(selectedHwClass);
                                setNewHwSection(selectedHwSection);
                                setNewHwSubject(getHomeworkSubjectsForClass(selectedHwClass)[0]);
                                setNewHwTitle('');
                                setNewHwDesc('');
                                setNewHwChapter('');
                                setNewHwMediaList([]);
                                setShowAssignHwModal(true);
                              }}
                              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 font-black text-xs cursor-pointer shadow-xl hover:scale-105 transition"
                            >
                              Assign Homework to Class {selectedHwClass}-{selectedHwSection} Now
                            </button>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filtered.map((hw) => (
                          <div
                            key={hw.id}
                            className="p-5 rounded-3xl bg-stone-900/95 border-2 border-amber-500/30 hover:border-amber-400 transition shadow-xl space-y-3 relative card-real-3d animate-hw-card-pop"
                          >
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="px-3 py-1 rounded-xl bg-amber-400/20 text-amber-300 font-black text-xs border border-amber-400/40">
                                {hw.subject}
                              </span>
                              <span className="text-[11px] font-mono text-amber-300/90 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800 animate-hw-deadline-beacon">
                                Due: {hw.dueDate}
                              </span>
                            </div>

                            <div className="text-[11px] text-stone-400 font-mono">
                              {hw.chapter || 'Curriculum Assignment'}
                            </div>

                            <h4 className="text-base font-black text-white">{hw.title}</h4>
                            <p className="text-xs text-stone-300 leading-relaxed whitespace-pre-wrap">{hw.desc}</p>

                            {/* Media Attachments Preview if present */}
                            {Array.isArray(hw.mediaList) && hw.mediaList.length > 0 && (
                              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <Camera className="w-3.5 h-3.5" />
                                  <span>Attached Learning Media ({hw.mediaList.length})</span>
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {hw.mediaList.map((m, idx) => (
                                    <div key={m.id || idx} className="rounded-xl overflow-hidden border border-stone-700 bg-stone-900 p-1">
                                      {m.type === 'image' && (
                                        <a href={m.data} target="_blank" rel="noopener noreferrer" title="Click to view full image">
                                          <img src={m.data} alt="attachment" className="w-24 h-20 object-cover rounded-lg hover:scale-105 transition cursor-pointer" />
                                        </a>
                                      )}
                                      {m.type === 'video' && (
                                        <video src={m.data} controls className="max-w-[220px] max-h-32 rounded-lg" />
                                      )}
                                      {m.type === 'audio' && (
                                        <audio src={m.data} controls className="h-8 max-w-[200px]" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Bottom Card Footer with Actions */}
                            <div className="pt-3 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                              <span className="text-stone-400">Teacher: <strong className="text-amber-300">{hw.teacher}</strong></span>

                              <div className="flex items-center gap-1.5">
                                {/* Voice Readout Button */}
                                <button
                                  type="button"
                                  onClick={() => handleSpeakHomework(hw)}
                                  className={\`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer min-h-[36px] \${
                                    speakingHwId === hw.id
                                      ? 'bg-amber-400 text-stone-950 border-amber-300 font-black shadow-md'
                                      : 'bg-stone-950 text-stone-300 border-stone-700 hover:border-amber-400 hover:text-amber-300'
                                  }\`}
                                  title="Listen to this homework aloud"
                                >
                                  <Volume2 className={\`w-3.5 h-3.5 \${speakingHwId === hw.id ? 'animate-hw-speaker-wave' : ''}\`} />
                                  <span>{speakingHwId === hw.id ? 'Stop Voice' : 'Listen'}</span>
                                </button>

                                {/* Edit Button (Faculty Only) */}
                                {isDimension5 && (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditHomework(hw)}
                                    className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-amber-300 border border-stone-700 hover:border-amber-500/50 transition cursor-pointer animate-hw-edit-twinkle min-h-[36px] min-w-[36px] flex items-center justify-center"
                                    title="Edit this homework"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                {/* Delete Button (Faculty Only) */}
                                {isDimension5 && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteHomework(hw.id)}
                                    className="p-2 rounded-xl bg-stone-950 hover:bg-rose-950 text-stone-400 hover:text-rose-400 border border-stone-700 hover:border-rose-500/50 transition cursor-pointer animate-hw-delete-shake min-h-[36px] min-w-[36px] flex items-center justify-center"
                                    title="Delete this homework"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Teacher: Assign / Edit Daily Homework Modal (Faculty Only) */}
                {showAssignHwModal && isDimension5 && (
                  <div className="fixed inset-0 z-50 bg-black/80 p-3 sm:p-4 flex items-center justify-center animate-fadeIn">
                    <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-stone-950 border-2 border-amber-400/80 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 elevation-3d-velvet">
                      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                          <Plus className="w-5 h-5 text-amber-400" />
                          <span>{editingHwId ? 'Edit Homework Assignment' : 'Publish Daily Homework to Students'}</span>
                        </h3>
                        <button onClick={() => setShowAssignHwModal(false)} className="text-stone-400 hover:text-white cursor-pointer p-1">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleCreateHomework} className="space-y-3.5 text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-amber-300 uppercase mb-1">Target Class</label>
                            <select
                              value={newHwClass}
                              onChange={(e) => {
                                setNewHwClass(e.target.value);
                                const subs = getHomeworkSubjectsForClass(e.target.value);
                                if (!subs.includes(newHwSubject)) {
                                  setNewHwSubject(subs[0]);
                                }
                              }}
                              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white min-h-[42px]"
                            >
                              {SCHOOL_CLASSES_CONFIG.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-amber-300 uppercase mb-1">Section</label>
                            <select
                              value={newHwSection}
                              onChange={(e) => setNewHwSection(e.target.value)}
                              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white min-h-[42px]"
                            >
                              {['A', 'B', 'C', 'D', 'E'].map(s => (
                                <option key={s} value={s}>Section {s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-amber-300 uppercase mb-1">Subject</label>
                            <select
                              value={newHwSubject}
                              onChange={(e) => setNewHwSubject(e.target.value)}
                              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white min-h-[42px]"
                            >
                              {getHomeworkSubjectsForClass(newHwClass).map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-amber-300 uppercase mb-1">Due Date</label>
                            <input
                              type="text"
                              value={newHwDueDate}
                              onChange={(e) => setNewHwDueDate(e.target.value)}
                              placeholder="e.g. Tomorrow, 08:30 AM"
                              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white min-h-[42px]"
                              required
                            />
                          </div>
                        </div>

                        {/* Collapsible Assign Faculty Member (Optional) */}
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setShowFacultyAssignField(prev => !prev)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer py-1"
                          >
                            <Plus className={\`w-3.5 h-3.5 transition-transform \${showFacultyAssignField ? 'rotate-45' : ''}\`} />
                            <span>{showFacultyAssignField ? 'Hide Faculty Member Assignment' : 'Assign Faculty Member (Optional)'}</span>
                          </button>

                          {showFacultyAssignField && (
                            <div className="mt-2 p-3 rounded-2xl bg-stone-900/90 border border-amber-500/30 animate-pop-in space-y-2">
                              <label className="block text-[11px] font-bold text-amber-300 uppercase">Faculty Member Name / Remarks</label>
                              <input
                                type="text"
                                value={newHwTeacher}
                                onChange={(e) => setNewHwTeacher(e.target.value)}
                                placeholder="Faculty Teacher Name (defaults to your profile name)"
                                className="w-full bg-stone-950 border border-stone-700 rounded-xl p-2.5 text-white min-h-[42px]"
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-amber-300 uppercase mb-1">Chapter / Unit</label>
                          <input
                            type="text"
                            value={newHwChapter}
                            onChange={(e) => setNewHwChapter(e.target.value)}
                            placeholder="e.g. Chapter 4: Linear Equations (DAV Textbook)"
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white min-h-[42px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-amber-300 uppercase mb-1">Assignment Title</label>
                          <input
                            type="text"
                            value={newHwTitle}
                            onChange={(e) => setNewHwTitle(e.target.value)}
                            placeholder="e.g. Solve Worksheet 4.1 Questions 1 to 10"
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white min-h-[42px]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-amber-300 uppercase mb-1">Detailed Instructions</label>
                          <textarea
                            rows={3}
                            value={newHwDesc}
                            onChange={(e) => setNewHwDesc(e.target.value)}
                            placeholder="Mention notebook section, textbook page number references, formula steps, and submission guidelines..."
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white leading-relaxed"
                            required
                          />
                        </div>

                        {/* Media Uploads: Image, Video, Audio */}
                        <div className="pt-2 border-t border-stone-800 space-y-2">
                          <label className="block text-[11px] font-bold text-amber-300 uppercase">
                            Attach Media (Photos, Video Clips, Voice Briefings)
                          </label>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition min-h-[40px]">
                              <Camera className="w-4 h-4 text-emerald-400" />
                              <span>Attach Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleAddHomeworkMedia(e, 'image')}
                                className="hidden"
                              />
                            </label>

                            <label className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition min-h-[40px]">
                              <Film className="w-4 h-4 text-cyan-400" />
                              <span>Attach Video</span>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleAddHomeworkMedia(e, 'video')}
                                className="hidden"
                              />
                            </label>

                            <label className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition min-h-[40px]">
                              <Mic className="w-4 h-4 text-amber-400" />
                              <span>Attach Audio</span>
                              <input
                                type="file"
                                accept="audio/*"
                                onChange={(e) => handleAddHomeworkMedia(e, 'audio')}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {/* Media Preview Tray */}
                          {newHwMediaList.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {newHwMediaList.map(m => (
                                <div key={m.id} className="relative group p-2 rounded-xl bg-stone-900 border border-amber-500/30 flex items-center gap-2 max-w-xs animate-hw-media-preview">
                                  {m.type === 'image' && (
                                    <img src={m.data} alt="thumb" className="w-10 h-10 object-cover rounded-lg" />
                                  )}
                                  {m.type === 'video' && (
                                    <Film className="w-8 h-8 text-cyan-400 shrink-0" />
                                  )}
                                  {m.type === 'audio' && (
                                    <Volume2 className="w-8 h-8 text-amber-400 shrink-0" />
                                  )}
                                  <span className="text-[11px] text-stone-300 truncate max-w-[140px] font-mono">{m.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveHomeworkMedia(m.id)}
                                    className="p-1 rounded-full bg-rose-900 text-rose-300 hover:text-white cursor-pointer ml-auto"
                                    title="Remove attachment"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Submit Action */}
                        <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-800">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAssignHwModal(false);
                              setEditingHwId(null);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-stone-900 text-stone-300 hover:text-white font-bold text-xs cursor-pointer min-h-[40px]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs shadow-xl shadow-orange-500/30 cursor-pointer transition transform hover:scale-105 active:scale-95 animate-hw-publish-glow min-h-[40px]"
                          >
                            {editingHwId ? 'Save & Update Homework' : 'Publish to Students Now'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PAGE 2: FACULTY DIRECT CONSULTATION & DOUBT CLEARANCE                 */}
            {/* --------------------------------------------------------------------- */}
            `;

code = code.slice(0, hwStartIdx) + newHwJsxBlock + code.slice(nextTabIdx);

fs.writeFileSync('src/components/TeachersSection.jsx', code, 'utf8');
console.log('Successfully completed homework full-screen and modal replacement in TeachersSection.jsx');
