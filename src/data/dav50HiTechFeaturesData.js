// =========================================================================
// DAV 50 HI-TECH INNOVATIONS MASTER DATA
// Cutting-Edge 2026 Academic, AI, CV, Voice, 3D & IoT Platform Features
// =========================================================================

export const HITECH_CATEGORIES = [
  { id: 'all', name: 'All 50 Innovations', emoji: '⚡', count: 50 },
  { id: 'ai_cognition', name: 'AI & Cognitive Neuromorphic', emoji: '🧠', count: 10, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { id: 'computer_vision', name: 'Computer Vision & OCR', emoji: '👁️', count: 8, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  { id: 'voice_audio', name: 'Voice, Speech & Vedic Audio', emoji: '🎙️', count: 7, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'spatial_3d', name: '3D Spatial Labs & WebGL', emoji: '🕶️', count: 7, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { id: 'security_proctoring', name: 'Quantum Shield Security', emoji: '🛡️', count: 6, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
  { id: 'iot_smart_classroom', name: 'Real-time IoT & Smart Classroom', emoji: '📡', count: 6, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  { id: 'gamification_social', name: 'Hyper-Personalization & Social', emoji: '⚡', count: 6, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' }
];

export const DAV_50_HITECH_FEATURES = [
  // 🧠 Category 1: AI & Cognitive Neuromorphic Learning (1-10)
  {
    id: 1,
    title: 'Vedic Neuro-Tutor (Contextual Socratic AI)',
    category: 'ai_cognition',
    badge: 'SOCRATIC AI',
    tag: 'Contextual Socratic Trees',
    description: 'An AI mentor trained on DAV syllabus books that never gives direct answers right away; instead, it uses the Socratic method to ask guided stepping-stone questions to help students derive formulas on their own.',
    targetAudience: 'Students (Class 3-8)',
    modeKey: 'socratic_tutor',
    icon: 'Brain'
  },
  {
    id: 2,
    title: 'Dynamic Spaced-Repetition Leitner Engine',
    category: 'ai_cognition',
    badge: 'MEMORY DECAY',
    tag: 'Ebbinghaus Algorithm',
    description: 'Algorithms that track the decay curve (Ebbinghaus forgetting curve) of every student’s memory per topic, automatically scheduling a 2-minute recap quiz right before the concept slips from memory.',
    targetAudience: 'Students (All Grades)',
    modeKey: 'leitner_curve',
    icon: 'RotateCcw'
  },
  {
    id: 3,
    title: 'AI Formula & Theorem Derivation Animator',
    category: 'ai_cognition',
    badge: 'VECTOR AXIOMS',
    tag: 'Visual Step Derivations',
    description: 'Students type or select any physics/math theorem (e.g., Pythagoras, Archimedes’ Principle), and the AI renders a step-by-step visual vector breakdown explaining every intermediate axiom.',
    targetAudience: 'Students (Class 6-8)',
    modeKey: 'theorem_derivator',
    icon: 'Layers'
  },
  {
    id: 4,
    title: 'Cognitive Load Analyzer',
    category: 'ai_cognition',
    badge: 'NEURO-METRICS',
    tag: 'Scroll & Reading Cadence',
    description: 'Uses reading speed, scroll stuttering, and pause intervals to detect when a student is mentally fatigued or confused, smoothly adjusting content complexity or offering a 60-second breathing break.',
    targetAudience: 'Students',
    modeKey: 'cognitive_load',
    icon: 'Flame'
  },
  {
    id: 5,
    title: 'Exam Question Predictor & Weightage Heatmap',
    category: 'ai_cognition',
    badge: 'PREDICTIVE ML',
    tag: '15-Yr DAV Board Analytics',
    description: 'Machine learning analysis of the last 15 years of DAV board and terminal examination papers to highlight "High-Probability" question clusters with statistical confidence intervals.',
    targetAudience: 'Students & Teachers',
    modeKey: 'question_predictor',
    icon: 'BarChart3'
  },
  {
    id: 6,
    title: 'Smart Paragraph Summarizer & Mind-Map Synthesizer',
    category: 'ai_cognition',
    badge: 'GRAPH SYNTHESIS',
    tag: 'Hierarchical SVG Trees',
    description: 'Ingests multi-page SST or Science chapters and instantly creates hierarchical, interactive knowledge trees with zoomable nodes for rapid visual revision.',
    targetAudience: 'Students (Class 4-8)',
    modeKey: 'mindmap_synthesizer',
    icon: 'Compass'
  },
  {
    id: 7,
    title: 'Bilingual Hindi-English Auto-Transliteration Tutor',
    category: 'ai_cognition',
    badge: 'LINGUISTIC NLP',
    tag: 'Dual-Script Academic Bridging',
    description: 'Real-time side-by-side translation that helps Hindi-medium DAV students transition seamlessly into English-medium technical terminology without losing conceptual comprehension.',
    targetAudience: 'Bilingual Students',
    modeKey: 'hindi_transliteration',
    icon: 'BookOpen'
  },
  {
    id: 8,
    title: 'Student Persona Adaptive Tone Engine',
    category: 'ai_cognition',
    badge: 'PERSONALITY AI',
    tag: 'Adaptive Tone Shift',
    description: 'Allows students to switch their AI tutor’s teaching style among "Friendly Senior", "Strict DAV Acharya", "Curious Scientist", or "Storyteller" with customized motivational reinforcement.',
    targetAudience: 'Students & Kids',
    modeKey: 'persona_engine',
    icon: 'Sparkles'
  },
  {
    id: 9,
    title: 'Automated Essay & Long-Answer Evaluator',
    category: 'ai_cognition',
    badge: 'RUBRIC NLP',
    tag: 'CBSE 5-Tier Scoring Matrix',
    description: 'Deep NLP engine that grades subjective answers against CBSE/DAV marking rubrics, analyzing vocabulary richness, grammar, thesis clarity, and factual accuracy.',
    targetAudience: 'Teachers & Students',
    modeKey: 'essay_evaluator',
    icon: 'FileText'
  },
  {
    id: 10,
    title: 'Zero-Knowledge Concept Prerequisite Graph',
    category: 'ai_cognition',
    badge: 'DAG TOPOLOGY',
    tag: 'Root-Cause Gap Tracing',
    description: 'If a student fails a Class 7 Fraction question, the system traverses backwards down the prerequisite dependency graph to identify if the root weakness lies in Class 5 LCM/HCF concepts.',
    targetAudience: 'Students & Faculty',
    modeKey: 'prereq_graph',
    icon: 'CheckSquare'
  },

  // 👁️ Category 2: Computer Vision & OCR Diagnostics (11-18)
  {
    id: 11,
    title: 'Handwritten Notebook OCR & Formula Scanner',
    category: 'computer_vision',
    badge: 'EDGE OCR',
    tag: 'Handwriting to LaTeX',
    description: 'Uses edge vision to scan handwritten math steps or science diagrams from physical notebook photos and convert them directly into editable LaTeX and step-checked equations.',
    targetAudience: 'Students (Class 5-8)',
    modeKey: 'handwritten_ocr',
    icon: 'Search'
  },
  {
    id: 12,
    title: 'Real-time Geometry Ruler & Protractor Overlay',
    category: 'computer_vision',
    badge: 'AR MEASUREMENT',
    tag: 'Sub-Degree Precision',
    description: 'Students hold their device camera over hand-drawn geometric constructions in their notebook; the AR overlay measures angles and lines in real-time, verifying precision to within 0.5 degrees.',
    targetAudience: 'Students (Class 6-8)',
    modeKey: 'geometry_protractor',
    icon: 'Sliders'
  },
  {
    id: 13,
    title: 'Chemical Equation Reaction Visualizer (Camera AR)',
    category: 'computer_vision',
    badge: 'PARTICLE SIM',
    tag: 'Molecular Bond Dynamics',
    description: 'Pointing the camera at any balanced or unbalanced chemical formula instantly generates an interactive 3D particle simulation of molecular bonding and electron exchange.',
    targetAudience: 'Science Students',
    modeKey: 'chemical_reaction',
    icon: 'Atom'
  },
  {
    id: 14,
    title: 'Graph Paper Auto-Corrector',
    category: 'computer_vision',
    badge: 'COORDINATE AI',
    tag: 'Cartesian Point Validator',
    description: 'Scans hand-drawn linear equations or bar graphs on physical DAV school graph sheets and detects misplotted points or incorrect scaling axes.',
    targetAudience: 'Math Students',
    modeKey: 'graph_paper_checker',
    icon: 'BarChart3'
  },
  {
    id: 15,
    title: 'Sanskrit Shloka Pronunciation Lipsync & Pitch Visualizer',
    category: 'computer_vision',
    badge: 'PHONETIC VISION',
    tag: 'Vedic Meter & Pitch Tracker',
    description: 'Students chant Vedic Gayatri or Shanti mantras into the microphone while the system provides real-time pitch contour matching and visual phoneme feedback.',
    targetAudience: 'All DAV Students',
    modeKey: 'shloka_lipsync',
    icon: 'Eye'
  },
  {
    id: 16,
    title: 'Eye-Strain & Posture Ergonomic Warning Engine',
    category: 'computer_vision',
    badge: 'HEALTH VISION',
    tag: 'Screen Proximity Guard',
    description: 'Optional front-camera vision pipeline that alerts students if they are hunching or holding their screen closer than 25 cm during late-night study sessions.',
    targetAudience: 'Students & Parents',
    modeKey: 'posture_guard',
    icon: 'ShieldCheck'
  },
  {
    id: 17,
    title: 'Multi-Page Optical Exam Sheet Batch Scanner',
    category: 'computer_vision',
    badge: 'TEACHER PRO',
    tag: '40 Sheets in 30 Seconds',
    description: 'Enables teachers to photograph a stack of 40 physical paper answer sheets in 30 seconds; the AI auto-aligns, crops, grades objective parts, and drafts marks into the teacher portal.',
    targetAudience: 'DAV Teachers',
    modeKey: 'batch_sheet_scanner',
    icon: 'FileText'
  },
  {
    id: 18,
    title: 'Map-Skill Geography Pointer & Coordinate Matcher',
    category: 'computer_vision',
    badge: 'CARTOGRAPHY',
    tag: 'Pinpoint Spatial Grading',
    description: 'Students drag physical or digital pins onto DAV SST maps; the vision engine grades latitudinal accuracy, river paths, and mineral deposit locations.',
    targetAudience: 'SST Students (Class 3-8)',
    modeKey: 'map_skill_matcher',
    icon: 'Compass'
  },

  // 🎙️ Category 3: Voice, Speech, Sanskrit & Audio Synthesis (19-25)
  {
    id: 19,
    title: 'Vedic Audio Chanting Master with Pitch Correction',
    category: 'voice_audio',
    badge: 'VEDIC SOUND',
    tag: 'Sanskrit Swara Alignment',
    description: 'Authentic studio-recorded Vedic meters with interactive pitch guidance so students can master Sanskrit pronunciation for school assemblies and Hawan rituals.',
    targetAudience: 'All DAV Campus',
    modeKey: 'vedic_chant_pitch',
    icon: 'Volume2'
  },
  {
    id: 20,
    title: 'AI Chapter Podcast Generator',
    category: 'voice_audio',
    badge: 'DUAL AUDIO',
    tag: 'Two-Voice Conversational Audio',
    description: 'Converts any dry textbook chapter into an engaging 8-minute conversational podcast between two animated AI student hosts, perfect for offline listening while commuting.',
    targetAudience: 'Students Commuting',
    modeKey: 'podcast_studio',
    icon: 'Music'
  },
  {
    id: 21,
    title: 'Voice-Activated "Hands-Free" Lab Assistant',
    category: 'voice_audio',
    badge: 'SPEECH REC',
    tag: 'Zero-Touch Chemical Command',
    description: 'Allows students working on practical experiments or holding a pencil to speak commands ("Hey Dixence, re-read step 4 of the titration procedure").',
    targetAudience: 'Lab Students & Teachers',
    modeKey: 'handsfree_voice',
    icon: 'Volume2'
  },
  {
    id: 22,
    title: 'Real-Time Dyslexia & Speech Fluency Audio Companion',
    category: 'voice_audio',
    badge: 'ACCESSIBILITY',
    tag: 'Synchronous Highlight Pacing',
    description: 'Highlights words synchronously as audio reads aloud, with adjustable speeds (0.5x to 2x) and syllables-breakdown modes for younger students.',
    targetAudience: 'Primary & Remedial Students',
    modeKey: 'dyslexia_reader',
    icon: 'Play'
  },
  {
    id: 23,
    title: 'Parent Audio Daily Briefing (WhatsApp Stream)',
    category: 'voice_audio',
    badge: 'WHATSAPP VOICE',
    tag: '60s Morning Smart Audio',
    description: 'Sends a 60-second morning audio snippet on WhatsApp or app push summarizing: "Namaste, today Rishit has a Class 8 Science test on Microorganisms and pending English homework".',
    targetAudience: 'DAV Parents',
    modeKey: 'parent_audio_brief',
    icon: 'Send'
  },
  {
    id: 24,
    title: 'Multi-Dialect Indian Voice Synthesizer',
    category: 'voice_audio',
    badge: 'BHARAT TTS',
    tag: 'Authentic Native Accents',
    description: 'Allows students to hear pronunciation in familiar, clear Indian English, Shuddh Hindi, and Sanskrit voices instead of robotic Western TTS.',
    targetAudience: 'Students & Parents',
    modeKey: 'indian_voice_accent',
    icon: 'Volume2'
  },
  {
    id: 25,
    title: 'Vocal Stress & Confidence Evaluator for Debates',
    category: 'voice_audio',
    badge: 'PUBLIC SPEAKING',
    tag: 'WPM, Pauses & Modulation',
    description: 'Analyzes student speech recordings for DAV declamation and debate contests, providing metrics on words-per-minute, pause cadence, filler words, and vocal modulation.',
    targetAudience: 'Debaters & Leaders',
    modeKey: 'debate_speech_coach',
    icon: 'Trophy'
  },

  // 🕶️ Category 4: 3D, WebGL & Spatial Interactive Science Labs (26-32)
  {
    id: 26,
    title: 'Virtual DAV Physics Optics Workbench',
    category: 'spatial_3d',
    badge: 'RAY TRACING',
    tag: 'Concave & Convex Lens Raytrace',
    description: 'Full 3D ray-tracing laboratory where students adjust concave/convex mirrors and prisms to observe focal length, refraction, and chromatic aberration dynamically.',
    targetAudience: 'Class 7-8 Physics',
    modeKey: 'optics_raytracer',
    icon: 'Sparkles'
  },
  {
    id: 27,
    title: 'Dissectible 3D Human Anatomy & Plant Organs',
    category: 'spatial_3d',
    badge: '3D BIOLOGY',
    tag: 'Layered Cross-Sectioning',
    description: 'Interactive 3D organs (heart, brain, flower xylem/phloem) with explosive assembly views, cross-section slicing, and zoom down to cellular levels.',
    targetAudience: 'Biology Students',
    modeKey: 'anatomy_3d_organ',
    icon: 'Heart'
  },
  {
    id: 28,
    title: 'Periodic Table Orbital Shell 3D Electron Cloud',
    category: 'spatial_3d',
    badge: 'QUANTUM ORBITALS',
    tag: '2n² Shell Particle Spins',
    description: 'Click on any element to watch Bohr and quantum mechanical electron probability clouds spin in real-time 3D space with temperature sliders.',
    targetAudience: 'Chemistry Students',
    modeKey: 'orbital_electron_cloud',
    icon: 'Atom'
  },
  {
    id: 29,
    title: 'Planetary Solar System Gravity & Orbit Simulator',
    category: 'spatial_3d',
    badge: 'KEPLER GRAVITY',
    tag: 'Slingshot & Orbital Dynamics',
    description: 'Students adjust planetary masses or orbital velocities to see gravitational slingshots and tidal forces according to Kepler’s and Newton’s laws.',
    targetAudience: 'Science & Astronomy',
    modeKey: 'solar_gravity_orbit',
    icon: 'Compass'
  },
  {
    id: 30,
    title: 'Circuit Builder with Real-time Ohm\'s Law Simulation',
    category: 'spatial_3d',
    badge: 'CIRCUIT SIM',
    tag: 'Visual Fuse & Overload Pop',
    description: 'Virtual breadboard with batteries, ammeters, resistors, and capacitors that pop with visual smoke animations if short-circuited or overloaded.',
    targetAudience: 'Physics Students',
    modeKey: 'circuit_breadboard',
    icon: 'Zap'
  },
  {
    id: 31,
    title: 'Historical Timeline 3D Walkthrough (Vedic & Harappan)',
    category: 'spatial_3d',
    badge: 'METAVERSE MUSEUM',
    tag: 'Interactive Harappan Artifacts',
    description: 'Virtual 3D museum exhibits for DAV History syllabus (Indus Valley Civilization, Vedic Period, Indian Freedom Struggle) with clickable historical artifacts.',
    targetAudience: 'History & SST Students',
    modeKey: 'vedic_history_museum',
    icon: 'BookOpen'
  },
  {
    id: 32,
    title: 'Weather & Tectonic Plate Collision Sandbox',
    category: 'spatial_3d',
    badge: 'TECTONIC 3D',
    tag: 'Himalayan Uplift Engine',
    description: 'Interactive SST geography simulator where students trigger tectonic boundary collisions to watch fold mountain formation, volcanic eruption vents, and earthquake fault lines.',
    targetAudience: 'Geography Students',
    modeKey: 'tectonic_sandbox',
    icon: 'Layers'
  },

  // 🛡️ Category 5: High-Tech Security, Proctoring & Academic Integrity (33-38)
  {
    id: 33,
    title: 'Dual-Camera Synchronized AI Exam Proctoring',
    category: 'security_proctoring',
    badge: 'QUANTUM SHIELD',
    tag: 'Synchronized Dual-View Telemetry',
    description: 'Mobile phone acts as a secondary side-angle room camera while the laptop webcam monitors gaze tracking, eliminating external assistance during scholarship exams.',
    targetAudience: 'CBT Hall & Scholarship Exams',
    modeKey: 'dual_camera_proctor',
    icon: 'ShieldCheck'
  },
  {
    id: 34,
    title: 'Audio Environment Noise Classifier',
    category: 'security_proctoring',
    badge: 'DECIBEL AI',
    tag: 'Whisper vs Ambient Hum Filter',
    description: 'Distinguishes between ambient ceiling fans and human whisper frequencies during online assessments, logging timestamped audio alerts without recording privacy violations.',
    targetAudience: 'Exam Invigilators',
    modeKey: 'audio_frequency_whisper',
    icon: 'Volume2'
  },
  {
    id: 35,
    title: 'Plagiarism & AI-Generated Text Detector for Student Essays',
    category: 'security_proctoring',
    badge: 'INTEGRITY AUDIT',
    tag: 'Perplexity & Burstiness Analysis',
    description: 'In-house classifier that analyzes semantic perplexity and burstiness to detect if submitted essays were copy-pasted directly from ChatGPT.',
    targetAudience: 'Teachers & HODs',
    modeKey: 'plagiarism_ai_detector',
    icon: 'Search'
  },
  {
    id: 36,
    title: 'Watermarked Digital Dynamic Hall Tickets',
    category: 'security_proctoring',
    badge: 'HMAC QR PASS',
    tag: 'Rolling 30s Encrypted Token',
    description: 'Generates encrypted, time-rotating QR-coded admit cards that prevent screenshot spoofing and allow 1-second gate verification at DAV exam centers.',
    targetAudience: 'All Examination Candidates',
    modeKey: 'rotating_qr_hallticket',
    icon: 'ShieldCheck'
  },
  {
    id: 37,
    title: 'Biometric Face-ID Attendance Logger',
    category: 'security_proctoring',
    badge: 'EDGE BIOMETRICS',
    tag: '50 Students in 5 Seconds',
    description: 'Instant classroom roll-call using rapid face bounding-boxes that log attendance in under 5 seconds for a class of 50 students directly to the school server.',
    targetAudience: 'Class Teachers',
    modeKey: 'face_attendance_logger',
    icon: 'Eye'
  },
  {
    id: 38,
    title: 'Zero-Knowledge Encrypted Parent Grade Vault',
    category: 'security_proctoring',
    badge: 'CRYPTOGRAPHIC LEDGER',
    tag: 'SHA-256 Tamper Proofing',
    description: 'Cryptographic ledger ensuring test score records cannot be altered or tampered with by unauthorized accounts or external scripts.',
    targetAudience: 'Parents & Administrators',
    modeKey: 'zk_grade_vault',
    icon: 'Lock'
  },

  // 📡 Category 6: Real-Time IoT, Smart Classroom & Telemetry (39-44)
  {
    id: 39,
    title: 'Smart School Bus Real-Time Telemetry & Arrival Predictor',
    category: 'iot_smart_classroom',
    badge: 'LIVE TELEMETRY',
    tag: '5-Minute ETA Geofence',
    description: 'GPS-enabled live bus route tracking with traffic ETA calculations, sending WhatsApp alerts 5 minutes before the bus reaches the student’s stop.',
    targetAudience: 'Parents & Students',
    modeKey: 'smart_bus_telemetry',
    icon: 'Bus'
  },
  {
    id: 40,
    title: 'Smart Smartboard Synchronizer (Teacher-to-Student Broadcast)',
    category: 'iot_smart_classroom',
    badge: 'SUB-50MS SYNC',
    tag: 'Digital Whiteboard Mirror',
    description: 'When a teacher writes on the digital classroom smartboard, strokes appear with sub-50ms latency on student tablets with personal bookmarking.',
    targetAudience: 'Teachers & Active Classes',
    modeKey: 'smartboard_sync',
    icon: 'Monitor'
  },
  {
    id: 41,
    title: 'Library Book RFID / Barcode Instant Self-Checkout',
    category: 'iot_smart_classroom',
    badge: 'SMART LIBRARY',
    tag: '1-Click Barcode Loan',
    description: 'Students scan school library barcodes using their phone camera to borrow books, with automated return reminders and digital PDF companion links.',
    targetAudience: 'All Readers',
    modeKey: 'rfid_library_checkout',
    icon: 'BookOpen'
  },
  {
    id: 42,
    title: 'Live Classroom Clicker & Poll System',
    category: 'iot_smart_classroom',
    badge: 'INSTANT CLICKER',
    tag: '10s Low-Latency Sockets',
    description: 'Teachers launch 10-second instant polls during live classes; students vote using low-bandwidth WebSocket sockets, generating instant pie-chart mastery heatmaps.',
    targetAudience: 'Classroom Teachers',
    modeKey: 'classroom_clicker_poll',
    icon: 'CheckSquare'
  },
  {
    id: 43,
    title: 'School Bell & Period Automation Gateway',
    category: 'iot_smart_classroom',
    badge: 'PA AUTOMATION',
    tag: 'Vedic Shloka Bell Sync',
    description: 'Integrates with campus PA hardware to broadcast Vedic shlokas, assembly announcements, and period chimes synchronously with digital platform schedules.',
    targetAudience: 'Campus Operations',
    modeKey: 'school_bell_automation',
    icon: 'Clock'
  },
  {
    id: 44,
    title: 'Bandwidth-Adaptive Offline Local Peer-to-Peer Sync',
    category: 'iot_smart_classroom',
    badge: 'ZERO DATA P2P',
    tag: 'Local Wi-Fi Mesh Sharing',
    description: 'In low-connectivity areas or rural DAV schools, students can sync notes, PDFs, and tests peer-to-peer over local Wi-Fi without consuming internet data.',
    targetAudience: 'Rural & Offline Students',
    modeKey: 'p2p_offline_sync',
    icon: 'RotateCcw'
  },

  // ⚡ Category 7: Hyper-Personalization, Gamification & Campus Social Hub (45-50)
  {
    id: 45,
    title: 'Inter-DAV School House Wars & Live Mega-Tournaments',
    category: 'gamification_social',
    badge: 'HOUSE CLASH',
    tag: 'Dayanand vs Hansraj vs Ashoka',
    description: 'Weekly intra-school and inter-school academic clashes where Dayanand, Hansraj, Ashoka, and Tagore houses compete in real-time live trivia showdowns.',
    targetAudience: 'All House Members',
    modeKey: 'inter_dav_arena',
    icon: 'Trophy'
  },
  {
    id: 46,
    title: 'Student Portfolio Blockchain-Verified Skill Badges',
    category: 'gamification_social',
    badge: 'IMMUTABLE BADGES',
    tag: 'Cryptographic Credential Mint',
    description: 'Verifiable digital micro-credentials awarded for Olympiad wins, 100-day Vedic streaks, and science fair achievements that can be shared on LinkedIn or digital CVs.',
    targetAudience: 'High Achievers & Seniors',
    modeKey: 'blockchain_badge_mint',
    icon: 'Award'
  },
  {
    id: 47,
    title: 'AI Career & Subject Stream Recommender (Class 8-10)',
    category: 'gamification_social',
    badge: 'CAREER RADAR',
    tag: 'PCM vs PCB vs Commerce vs Arts',
    description: 'Analyzes multi-year performance patterns, problem-solving speed, and subject enthusiasm to guide students toward Science (PCM/PCB), Commerce, or Humanities.',
    targetAudience: 'Class 8-10 Students',
    modeKey: 'career_stream_predictor',
    icon: 'Compass'
  },
  {
    id: 48,
    title: 'Study-Buddy Matching Engine (Skill Swap)',
    category: 'gamification_social',
    badge: 'PEER MENTORSHIP',
    tag: 'Complementary Strengths Pair',
    description: 'Algorithmic matching that pairs a student who is strong in Mathematics but weak in Hindi with a classmate who has complementary strengths for peer learning.',
    targetAudience: 'Classmates & Study Groups',
    modeKey: 'study_buddy_match',
    icon: 'Heart'
  },
  {
    id: 49,
    title: 'Virtual School Campus Metaverse Hub',
    category: 'gamification_social',
    badge: 'DAV METAVERSE',
    tag: 'Interactive 3D Campus Quad',
    description: 'A low-poly WebGL virtual campus where students customize house-themed avatars, meet in the virtual DAV library, and explore interactive project science booths.',
    targetAudience: 'All DAV Students',
    modeKey: 'metaverse_campus_quad',
    icon: 'Layers'
  },
  {
    id: 50,
    title: 'Vedic Value Karmic Points & Community Service Tracker',
    category: 'gamification_social',
    badge: 'KARMIC LEAVES',
    tag: 'Dharma & Seva Logging',
    description: 'Gamified reward system honoring acts of discipline, peer tutoring, tree plantation, and moral ethics, redeemable for house honor points and platform badges.',
    targetAudience: 'All DAV Students & Mentors',
    modeKey: 'karmic_points_tracker',
    icon: 'Sparkles'
  }
];
