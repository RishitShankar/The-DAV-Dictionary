import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Search, Plus, Share2, MoreVertical, Send, Check, 
  Paperclip, Smile, Image as ImageIcon, CheckCheck, Compass, 
  Trash2, Settings, Camera, UploadCloud, Edit3, X, ShieldAlert,
  ArrowRight, Heart, ThumbsUp, Flame, PartyPopper, CheckCircle2,
  ExternalLink, Copy, UserPlus, UserMinus, ShieldCheck, Lock,
  BadgeCheck, MessageCircle, Volume2, Sparkles, Bell
} from 'lucide-react';
import { getRegisteredUsers } from '../data/preloadedUsers';

const CHANNELS_STORAGE_KEY = 'dav_whatsapp_channels_v2';

// Initial Official Preloaded Channels
const INITIAL_DAV_CHANNELS = [
  {
    id: 'dav_official_circulars',
    name: 'DAVCMC Official Notice Board',
    description: 'Central circulars, holiday notifications, board examination time-tables, and institutional directives from the Principal & DAVCMC Directorate.',
    dp: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150',
    creatorId: 'dav_admin_principal',
    creatorName: 'Principal Office & DAVCMC',
    creatorDimension: 5,
    createdAt: '2026-10-20T08:00:00Z',
    inviteCode: 'DAV-CMC-2026',
    verified: true,
    category: 'Official Board Circulars',
    subscribers: [
      { id: 'usr_admin', name: 'A.K. Sharma (Principal)', role: 'owner', dimension: 5 },
      { id: 'usr_rishit', name: 'Rishit Shankar (Head Boy)', role: 'admin', dimension: 4 },
      { id: 'std_1', name: 'Aarav Kumar (Class 8-D)', role: 'member', dimension: 1 },
      { id: 'std_2', name: 'Priya Kumari (Class 8-A)', role: 'member', dimension: 2 }
    ],
    pendingRequests: [
      { id: 'req_101', userId: 'std_rehansh', userName: 'Rehansh Shrevashtav', classNum: '8-D', rollNo: '18', requestedAt: 'Today at 09:15 AM' },
      { id: 'req_102', userId: 'std_divyanshu', userName: 'Divyanshu Kumar', classNum: '8-D', rollNo: '22', requestedAt: 'Today at 10:40 AM' }
    ],
    posts: [
      {
        id: 'post_c1_1',
        authorId: 'dav_admin_principal',
        authorName: 'A.K. Sharma (Principal)',
        authorRole: 'Channel Admin',
        timestamp: '08:30 AM',
        date: 'Today',
        text: '📢 OFFICIAL CIRCULAR: Winter school timings will take effect from Monday. Morning assembly starts at 08:30 AM sharp. Students must wear formal winter blazers and DAV crest.',
        attachment: null,
        reactions: { '👍': 48, '❤️': 32, '🎉': 19 }
      },
      {
        id: 'post_c1_2',
        authorId: 'dav_admin_principal',
        authorName: 'A.K. Sharma (Principal)',
        authorRole: 'Channel Admin',
        timestamp: '11:15 AM',
        date: 'Today',
        text: '🏆 DAV Board Model Assessment sets for Class 8 (Science, Maths, SST & Hindi) have been uploaded to Section 2: Digital Library. All students are advised to practice thoroughly.',
        attachment: null,
        reactions: { '🔥': 54, '👏': 38, '👍': 42 }
      }
    ]
  },
  {
    id: 'dav_class8_bulletin',
    name: 'Class 8 Board Exam Academic Bulletin',
    description: 'High-yield chapter summaries, 5-mark model answers, formula sheets, and DAV Board syllabus guidance curated by Head Boy Rishit Shankar.',
    dp: '/rishit_shankar.jpg',
    creatorId: 'rishit_shankar_headboy',
    creatorName: 'Rishit Shankar (Head Boy)',
    creatorDimension: 4,
    createdAt: '2026-10-21T09:00:00Z',
    inviteCode: 'DAV-8D-TOPPER',
    verified: true,
    category: 'Class 8 Board Prep',
    subscribers: [
      { id: 'usr_rishit', name: 'Rishit Shankar (Head Boy)', role: 'owner', dimension: 4 },
      { id: 'tch_vandana', name: 'Dr. Vandana Sen (HOD Science)', role: 'admin', dimension: 5 },
      { id: 'std_3', name: 'Saharsh Shankar', role: 'member', dimension: 2 }
    ],
    pendingRequests: [
      { id: 'req_103', userId: 'std_ramkant', userName: 'Ram Kant', classNum: '8-D', rollNo: '09', requestedAt: 'Yesterday at 04:20 PM' }
    ],
    posts: [
      {
        id: 'post_c2_1',
        authorId: 'rishit_shankar_headboy',
        authorName: 'Rishit Shankar (Head Boy)',
        authorRole: 'Channel Creator',
        timestamp: '10:00 AM',
        date: 'Today',
        text: '🔥 Class 8 Maths Blueprint: Squares, Square Roots, Cubes & Algebraic Identities carry 22 marks in Section B & D. I have verified all model steps with DAV Board criteria.',
        attachment: null,
        reactions: { '🔥': 65, '❤️': 41, '👏': 33 }
      },
      {
        id: 'post_c2_2',
        authorId: 'rishit_shankar_headboy',
        authorName: 'Rishit Shankar (Head Boy)',
        authorRole: 'Channel Creator',
        timestamp: '01:45 PM',
        date: 'Today',
        text: '📚 Hindi literature (ज्ञान सागर) and grammar (अभ्यास सागर) are now fully cataloged in Rishi AI. Practice your 5-mark and HOTS questions for Chapter 1 & 2 directly on the portal!',
        attachment: null,
        reactions: { '👍': 51, '❤️': 39, '🎉': 27 }
      }
    ]
  },
  {
    id: 'dav_olympiad_wing',
    name: 'DAV Science & Math Olympiad Elite Wing',
    description: 'Weekly Olympiad challenges, IMO/NSTSE previous year questions, experimental demonstrations, and rapid analytical logic methods.',
    dp: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150',
    creatorId: 'tch_vandana_hod',
    creatorName: 'Dr. Vandana Sen (HOD Science)',
    creatorDimension: 5,
    createdAt: '2026-10-22T10:30:00Z',
    inviteCode: 'DAV-OLYMP-2026',
    verified: true,
    category: 'STEM & Olympiads',
    subscribers: [
      { id: 'tch_vandana', name: 'Dr. Vandana Sen (HOD Science)', role: 'owner', dimension: 5 },
      { id: 'usr_rishit', name: 'Rishit Shankar (Head Boy)', role: 'admin', dimension: 4 }
    ],
    pendingRequests: [],
    posts: [
      {
        id: 'post_c3_1',
        authorId: 'tch_vandana_hod',
        authorName: 'Dr. Vandana Sen (HOD Science)',
        authorRole: 'Channel Admin',
        timestamp: '09:00 AM',
        date: 'Yesterday',
        text: '🔬 Olympiad Problem of the Week: Synthetic fibres exhibit tensile strength higher than steel wires of equal thickness. Which polymer configuration accounts for this property? Discuss in your study circle!',
        attachment: null,
        reactions: { '💡': 35, '👍': 29, '🔥': 22 }
      }
    ]
  }
];

export function WhatsAppChannelsModule({ user, isDimension5, onSwitchToChats }) {
  // Dimension 4 (Developer Master) and Dimension 5 (Teacher / Staff) are authorized to create & broadcast
  const userDimension = Number(user?.dimension ?? (user?.isAdmin ? 4 : 1));
  const canCreateChannel = Boolean(
    user?.dimension === 4 ||
    user?.dimension === 5 ||
    user?.isAdmin ||
    isDimension5 ||
    userDimension >= 4 ||
    user?.id === 'rishibhai' ||
    user?.plan === 'teacher' ||
    user?.plan === 'dev'
  );

  // Load Channels from LocalStorage or Fallback (Demo channels removed)
  const [channels, setChannels] = useState(() => {
    try {
      const stored = localStorage.getItem(CHANNELS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Remove legacy demo mock channels
          const filtered = parsed.filter(c => 
            c && c.id && 
            !c.id.startsWith('dav_official_circulars') && 
            !c.id.startsWith('dav_olympiad_wing') && 
            !c.id.startsWith('dav_demo')
          );
          return filtered;
        }
      }
    } catch (e) {
      console.warn('Error reading channels store:', e);
    }
    return [];
  });

  // Save Channels to LocalStorage on update
  useEffect(() => {
    try {
      localStorage.setItem(CHANNELS_STORAGE_KEY, JSON.stringify(channels));
    } catch (e) {
      console.warn('Error persisting channels store:', e);
    }
  }, [channels]);

  // Active Selected Channel
  const [activeChannelId, setActiveChannelId] = useState(() => {
    return channels[0]?.id || null;
  });

  // Sub-Tab in Left Panel: 'my_channels' | 'explore'
  const [channelTab, setChannelTab] = useState('my_channels');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRestrictionModal, setShowRestrictionModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Creation Form State
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    category: 'Academics & Board Prep',
    dp: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150'
  });

  // Management Form State
  const [manageForm, setManageForm] = useState({
    name: '',
    description: '',
    category: '',
    dp: ''
  });
  const [manageTab, setManageTab] = useState('profile'); // 'profile' | 'requests' | 'subscribers' | 'invite'
  const [newMemberSearch, setNewMemberSearch] = useState('');

  // Broadcast Message Composer State
  const [broadcastText, setBroadcastText] = useState('');
  const [selectedInviteCodeInput, setSelectedInviteCodeInput] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');

  // Selected Channel Object
  const currentChannel = channels.find(c => c.id === activeChannelId) || channels[0] || null;

  // Sync Manage Form when Active Channel or Manage Modal opens
  useEffect(() => {
    if (currentChannel) {
      setManageForm({
        name: currentChannel.name,
        description: currentChannel.description,
        category: currentChannel.category || 'DAV Official Channel',
        dp: currentChannel.dp || ''
      });
    }
  }, [currentChannel, showManageModal]);

  // Is Current User Creator / Admin of Current Channel?
  const isChannelAdmin = Boolean(
    currentChannel && (
      canCreateChannel && (
        currentChannel.creatorId === user?.id ||
        user?.isAdmin ||
        user?.id === 'rishibhai' ||
        currentChannel.subscribers?.some(s => s.id === user?.id && (s.role === 'owner' || s.role === 'admin')) ||
        (isDimension5 && currentChannel.creatorDimension === 5)
      )
    )
  );

  // Is Current User a Follower / Subscriber of Current Channel?
  const isSubscriber = Boolean(
    currentChannel && currentChannel.subscribers?.some(s => 
      s.id === user?.id || 
      (s.name && user?.name && s.name.toLowerCase() === user.name.toLowerCase())
    )
  );

  // Has Current User Sent a Join Request to Current Channel?
  const isRequestPending = Boolean(
    currentChannel && currentChannel.pendingRequests?.some(r => 
      r.userId === user?.id || 
      (r.userName && user?.name && r.userName.toLowerCase() === user.name.toLowerCase())
    )
  );

  // Channels User Has Joined or Owns
  const myChannels = channels.filter(c => {
    const isOwner = c.creatorId === user?.id || (canCreateChannel && c.creatorDimension === 5 && isDimension5);
    const isSub = c.subscribers?.some(s => s.id === user?.id || (s.name && user?.name && s.name.toLowerCase() === user.name.toLowerCase()));
    return isOwner || isSub;
  });

  // Channels to Explore / Follow (Public Directory)
  const exploreChannels = channels.filter(c => {
    const isOwner = c.creatorId === user?.id || (canCreateChannel && c.creatorDimension === 5 && isDimension5);
    const isSub = c.subscribers?.some(s => s.id === user?.id || (s.name && user?.name && s.name.toLowerCase() === user.name.toLowerCase()));
    return !isOwner && !isSub;
  });

  // Filtered Channels for Display
  const displayedChannels = (channelTab === 'my_channels' ? myChannels : exploreChannels).filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      (c.category && c.category.toLowerCase().includes(q))
    );
  });

  // -------------------------------------------------------------------------
  // CREATE CHANNEL HANDLER (Dimension 4 & 5 Only)
  // -------------------------------------------------------------------------
  const handleOpenCreateChannel = () => {
    if (!canCreateChannel) {
      setShowRestrictionModal(true);
      return;
    }
    setCreateForm({
      name: '',
      description: '',
      category: isDimension5 ? 'Teacher Subject Circular' : 'Developer Master Bulletin',
      dp: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150'
    });
    setShowCreateModal(true);
  };

  const handleCreateChannelSubmit = (e) => {
    e.preventDefault();
    if (!createForm.name.trim()) return;

    const newChannelId = `channel_${Date.now()}`;
    const cleanCode = `DAV-${createForm.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 5).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newChannel = {
      id: newChannelId,
      name: createForm.name.trim(),
      description: createForm.description.trim() || 'Official broadcasting channel for DAV students & faculty.',
      dp: createForm.dp || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150',
      creatorId: user?.id || `user_dim_${userDimension}`,
      creatorName: user?.name || (isDimension5 ? 'DAV Faculty Member' : 'Developer Master'),
      creatorDimension: isDimension5 ? 5 : 4,
      createdAt: new Date().toISOString(),
      inviteCode: cleanCode,
      verified: true,
      category: createForm.category || 'General Notice Desk',
      subscribers: [
        {
          id: user?.id || `user_dim_${userDimension}`,
          name: user?.name || (isDimension5 ? 'DAV Faculty Member' : 'Developer Master'),
          role: 'owner',
          dimension: isDimension5 ? 5 : 4
        }
      ],
      pendingRequests: [],
      posts: [
        {
          id: `post_${Date.now()}`,
          authorId: user?.id || 'creator',
          authorName: user?.name || (isDimension5 ? 'DAV Faculty Member' : 'Developer Master'),
          authorRole: 'Channel Creator',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: 'Today',
          text: `🎉 Welcome to ${createForm.name.trim()}! This is the official broadcast channel for live notices, study material, and academic updates. Follow and stay tuned!`,
          attachment: null,
          reactions: { '👏': 5, '❤️': 3 }
        }
      ]
    };

    setChannels(prev => [newChannel, ...prev]);
    setActiveChannelId(newChannelId);
    setChannelTab('my_channels');
    setShowCreateModal(false);
  };

  // -------------------------------------------------------------------------
  // FOLLOW / REQUEST TO JOIN CHANNEL (Students & Followers)
  // -------------------------------------------------------------------------
  const handleFollowOrRequest = (channelId) => {
    const target = channels.find(c => c.id === channelId);
    if (!target) return;

    // If user is already a member
    if (target.subscribers?.some(s => s.id === user?.id)) return;

    // Check if request already pending
    if (target.pendingRequests?.some(r => r.userId === user?.id)) return;

    const newRequest = {
      id: `req_${Date.now()}`,
      userId: user?.id || `student_${Date.now()}`,
      userName: user?.name || 'DAV Student',
      classNum: user?.classNum || '8',
      rollNo: user?.rollNo || '12',
      requestedAt: 'Just now'
    };

    setChannels(prev => prev.map(c => {
      if (c.id === channelId) {
        return {
          ...c,
          pendingRequests: [...(c.pendingRequests || []), newRequest]
        };
      }
      return c;
    }));
  };

  // -------------------------------------------------------------------------
  // JOIN VIA INVITE CODE / LINK
  // -------------------------------------------------------------------------
  const handleJoinWithCode = (e) => {
    e.preventDefault();
    setInviteError('');
    setInviteSuccess('');

    const raw = selectedInviteCodeInput.trim().toUpperCase();
    if (!raw) {
      setInviteError('Please enter an invite code or link.');
      return;
    }

    // Extract code if user pasted a URL
    const code = raw.includes('/') ? raw.split('/').pop() : raw;
    const match = channels.find(c => c.inviteCode?.toUpperCase() === code);

    if (!match) {
      setInviteError('Invalid invite code. No matching DAV Channel found.');
      return;
    }

    // Add user directly as a member if not already joined
    const userId = user?.id || `student_${Date.now()}`;
    const userName = user?.name || 'DAV Student';

    if (match.subscribers?.some(s => s.id === userId)) {
      setInviteSuccess(`You are already a member of "${match.name}". Switching to channel!`);
      setActiveChannelId(match.id);
      setChannelTab('my_channels');
      setTimeout(() => setShowInviteModal(false), 800);
      return;
    }

    const newSub = {
      id: userId,
      name: userName,
      role: 'member',
      dimension: userDimension
    };

    setChannels(prev => prev.map(c => {
      if (c.id === match.id) {
        return {
          ...c,
          subscribers: [...(c.subscribers || []), newSub],
          pendingRequests: (c.pendingRequests || []).filter(r => r.userId !== userId)
        };
      }
      return c;
    }));

    setInviteSuccess(`🎉 Success! You have joined "${match.name}".`);
    setActiveChannelId(match.id);
    setChannelTab('my_channels');
    setTimeout(() => {
      setShowInviteModal(false);
      setSelectedInviteCodeInput('');
      setInviteSuccess('');
    }, 1000);
  };

  // -------------------------------------------------------------------------
  // BROADCAST POST TO CHANNEL (Creator / Admin Only)
  // -------------------------------------------------------------------------
  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!broadcastText.trim() || !activeChannelId) return;

    const newPost = {
      id: `post_${Date.now()}`,
      authorId: user?.id || 'admin',
      authorName: user?.name || (isDimension5 ? 'DAV Faculty' : 'Channel Admin'),
      authorRole: isDimension5 ? 'Subject Teacher' : 'Channel Admin',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      text: broadcastText.trim(),
      attachment: null,
      reactions: { '👍': 1 }
    };

    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          posts: [...(c.posts || []), newPost]
        };
      }
      return c;
    }));

    setBroadcastText('');
  };

  // -------------------------------------------------------------------------
  // EMOJI REACTIONS HANDLER (Followers & Admins)
  // -------------------------------------------------------------------------
  const handleReactionClick = (postId, emoji) => {
    if (!activeChannelId) return;

    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          posts: (c.posts || []).map(p => {
            if (p.id === postId) {
              const currentCount = p.reactions?.[emoji] || 0;
              return {
                ...p,
                reactions: {
                  ...(p.reactions || {}),
                  [emoji]: currentCount + 1
                }
              };
            }
            return p;
          })
        };
      }
      return c;
    }));
  };

  // -------------------------------------------------------------------------
  // CHANNEL MANAGEMENT: SAVE PROFILE (Name, DP, Bio)
  // -------------------------------------------------------------------------
  const handleSaveChannelProfile = (e) => {
    e.preventDefault();
    if (!manageForm.name.trim() || !activeChannelId) return;

    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          name: manageForm.name.trim(),
          description: manageForm.description.trim(),
          category: manageForm.category.trim(),
          dp: manageForm.dp.trim() || c.dp
        };
      }
      return c;
    }));

    setShowManageModal(false);
  };

  // -------------------------------------------------------------------------
  // DELETE CHANNEL (Admins / Dimension 4 & 5)
  // -------------------------------------------------------------------------
  const handleDeleteChannel = (channelId) => {
    if (!channelId) return;
    if (window.confirm('Are you sure you want to delete this channel? All posts will be removed.')) {
      setChannels(prev => {
        const remaining = prev.filter(c => c.id !== channelId);
        if (activeChannelId === channelId) {
          setActiveChannelId(remaining[0]?.id || null);
        }
        return remaining;
      });
      setShowManageModal(false);
    }
  };

  // -------------------------------------------------------------------------
  // DELETE POST FROM CHANNEL (Author / Admins)
  // -------------------------------------------------------------------------
  const handleDeletePost = (postId) => {
    if (!postId || !activeChannelId) return;
    if (window.confirm('Delete this broadcast message from the channel?')) {
      setChannels(prev => prev.map(c => {
        if (c.id === activeChannelId) {
          return {
            ...c,
            posts: (c.posts || []).filter(p => p.id !== postId)
          };
        }
        return c;
      }));
    }
  };

  // -------------------------------------------------------------------------
  // ACCEPT / DECLINE JOIN REQUESTS (Dimension 4 & 5)
  // -------------------------------------------------------------------------
  const handleAcceptRequest = (requestId) => {
    if (!activeChannelId) return;

    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        const req = (c.pendingRequests || []).find(r => r.id === requestId);
        if (!req) return c;

        const newSubscriber = {
          id: req.userId,
          name: req.userName,
          role: 'member',
          dimension: 1
        };

        return {
          ...c,
          subscribers: [...(c.subscribers || []), newSubscriber],
          pendingRequests: (c.pendingRequests || []).filter(r => r.id !== requestId)
        };
      }
      return c;
    }));
  };

  const handleDeclineRequest = (requestId) => {
    if (!activeChannelId) return;

    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          pendingRequests: (c.pendingRequests || []).filter(r => r.id !== requestId)
        };
      }
      return c;
    }));
  };

  const handleAcceptAllRequests = () => {
    if (!activeChannelId || !currentChannel) return;

    const newSubs = (currentChannel.pendingRequests || []).map(r => ({
      id: r.userId,
      name: r.userName,
      role: 'member',
      dimension: 1
    }));

    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          subscribers: [...(c.subscribers || []), ...newSubs],
          pendingRequests: []
        };
      }
      return c;
    }));
  };

  // -------------------------------------------------------------------------
  // REMOVE SUBSCRIBER (Owner / Admin)
  // -------------------------------------------------------------------------
  const handleRemoveSubscriber = (subId) => {
    if (!activeChannelId) return;

    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          subscribers: (c.subscribers || []).filter(s => s.id !== subId)
        };
      }
      return c;
    }));
  };

  // -------------------------------------------------------------------------
  // ADD MEMBER DIRECTLY FROM DIRECTORY
  // -------------------------------------------------------------------------
  const handleAddMemberDirectly = (memberUser) => {
    if (!activeChannelId || !currentChannel) return;

    if (currentChannel.subscribers?.some(s => s.id === memberUser.id)) return;

    const newSub = {
      id: memberUser.id,
      name: memberUser.name,
      role: 'member',
      dimension: memberUser.dimension || 1
    };

    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          subscribers: [...(c.subscribers || []), newSub],
          pendingRequests: (c.pendingRequests || []).filter(r => r.userId !== memberUser.id)
        };
      }
      return c;
    }));
  };

  // Copy Invite Link
  const handleCopyInviteLink = (code) => {
    const inviteUrl = `dav://whatsapp/channel/${code}`;
    navigator.clipboard?.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Registered students pool for adding members
  const availableRegisteredStudents = getRegisteredUsers().filter(u => {
    if (u.dimension === 5 || u.isTeacher) return false;
    if (currentChannel?.subscribers?.some(s => s.id === u.id)) return false;
    if (!newMemberSearch.trim()) return true;
    const q = newMemberSearch.toLowerCase();
    return u.name.toLowerCase().includes(q) || (u.classNum && String(u.classNum).includes(q));
  });

  return (
    <div className="w-full h-full flex flex-col sm:flex-row overflow-hidden bg-white font-sans select-none">
      
      {/* ========================================================================= */}
      {/* CHANNELS LEFT DIRECTORY COLUMN                                             */}
      {/* ========================================================================= */}
      <div className="w-full sm:w-80 md:w-96 bg-white border-r border-[#d1d7db] flex flex-col h-full shrink-0">
        
        {/* Header Bar */}
        <div className="p-3.5 pb-2 border-b border-[#f0f2f5] space-y-3 shrink-0 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-[#00a884]" />
              <h2 className="text-xl font-bold text-[#111b21] tracking-tight">Channels</h2>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Join with Invite Code Button */}
              <button
                type="button"
                onClick={() => setShowInviteModal(true)}
                className="px-2.5 py-1 rounded-lg bg-[#f0f2f5] hover:bg-[#e9edef] text-[#111b21] text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                title="Join with Invite Code or Link"
              >
                <LinkIcon className="w-3.5 h-3.5 text-[#00a884]" />
                <span className="hidden md:inline">Invite Code</span>
              </button>

              {/* Create Channel Button (Dimensions 4 & 5 only) */}
              <button
                type="button"
                onClick={handleOpenCreateChannel}
                className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                  canCreateChannel 
                    ? 'bg-[#00a884] hover:bg-[#008f6f] text-white' 
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-300'
                }`}
                title={canCreateChannel ? 'Create New Channel' : 'Dimension 4 & 5 Only'}
              >
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
            </div>
          </div>

          {/* Search Channels Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#54656f]" />
            <input
              type="text"
              placeholder="Search official DAV channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#f0f2f5] border border-transparent rounded-lg text-xs font-bold text-[#111b21] placeholder-[#667781] focus:outline-none focus:bg-white focus:border-[#00a884] transition"
            />
          </div>

          {/* Directory Navigation Tabs: My Channels vs Find to Follow */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setChannelTab('my_channels')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                channelTab === 'my_channels'
                  ? 'bg-[#d9fdd3] text-[#008069] border border-[#c3f4bc]'
                  : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
              }`}
            >
              <span>My Channels</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white text-[10px] font-bold text-[#008069] shadow-xs">
                {myChannels.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setChannelTab('explore')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                channelTab === 'explore'
                  ? 'bg-[#d9fdd3] text-[#008069] border border-[#c3f4bc]'
                  : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Find to Follow</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white text-[10px] font-bold text-[#54656f] shadow-xs">
                {exploreChannels.length}
              </span>
            </button>
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#f0f2f5] scrollbar-thin bg-white">
          {displayedChannels.length === 0 ? (
            <div className="p-8 text-center space-y-3 text-[#667781]">
              <div className="w-12 h-12 rounded-full bg-[#f0f2f5] flex items-center justify-center mx-auto text-[#00a884]">
                <Compass className="w-6 h-6" />
              </div>
              <p className="font-bold text-sm text-[#111b21]">
                {channelTab === 'my_channels' ? 'No Joined Channels' : 'No Channels Found'}
              </p>
              <p className="text-xs text-[#667781] max-w-xs mx-auto">
                {channelTab === 'my_channels'
                  ? 'Switch to "Find to Follow" to discover and request to join official faculty channels.'
                  : 'All available channels match your search filter.'}
              </p>
              {channelTab === 'my_channels' && (
                <button
                  type="button"
                  onClick={() => setChannelTab('explore')}
                  className="px-4 py-2 rounded-xl bg-[#00a884] text-white text-xs font-black hover:bg-[#008f6f] transition cursor-pointer"
                >
                  Explore Channels to Follow
                </button>
              )}
            </div>
          ) : (
            displayedChannels.map((channel) => {
              const isSelected = channel.id === activeChannelId;
              const subCount = channel.subscribers?.length || 0;
              const pendingCount = channel.pendingRequests?.length || 0;
              const isUserMember = channel.subscribers?.some(s => s.id === user?.id);
              const isUserPending = channel.pendingRequests?.some(r => r.userId === user?.id);
              const isOwner = channel.creatorId === user?.id;
              const lastPost = channel.posts?.[channel.posts.length - 1];

              return (
                <div
                  key={channel.id}
                  onClick={() => setActiveChannelId(channel.id)}
                  className={`w-full p-3.5 flex items-start gap-3 transition cursor-pointer border-l-4 ${
                    isSelected
                      ? 'bg-[#f0f2f5] border-[#00a884]'
                      : 'border-transparent hover:bg-[#f7f8fa]'
                  }`}
                >
                  {/* Channel DP */}
                  <div className="relative shrink-0">
                    <img
                      src={channel.dp || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150'}
                      alt={channel.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#d1d7db] shadow-xs"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150';
                      }}
                    />
                    {channel.verified && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#00a884] text-white flex items-center justify-center ring-2 ring-white" title="Verified DAV Channel">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Channel Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#111b21] truncate flex items-center gap-1.5">
                        <span className="truncate">{channel.name}</span>
                        {isOwner && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-black uppercase">
                            Admin
                          </span>
                        )}
                      </h3>
                      {lastPost && (
                        <span className="text-[10px] text-[#667781] font-semibold shrink-0">
                          {lastPost.timestamp || 'Today'}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#667781] line-clamp-1 mt-0.5">
                      {lastPost?.text || channel.description}
                    </div>

                    <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-[#f0f2f5]/80">
                      <span className="text-[10px] text-[#00a884] font-black uppercase tracking-wider flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{subCount} {subCount === 1 ? 'follower' : 'followers'}</span>
                      </span>

                      {/* Request to Join / Follow Action if in Explore */}
                      {channelTab === 'explore' && (
                        <div>
                          {isUserMember ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Following</span>
                            </span>
                          ) : isUserPending ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                              <span>Request Sent ⏳</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFollowOrRequest(channel.id);
                              }}
                              className="px-2.5 py-0.5 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white text-[10px] font-black shadow-xs transition cursor-pointer flex items-center gap-1"
                            >
                              <span>Follow / Request</span>
                            </button>
                          )}
                        </div>
                      )}

                      {/* Pending Join Requests Notification for Admin */}
                      {isOwner && pendingCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black animate-pulse flex items-center gap-1">
                          <span>{pendingCount} new request{pendingCount > 1 ? 's' : ''}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHANNELS RIGHT CONVERSATION & BROADCAST FEED COLUMN                        */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col h-full bg-[#efeae2] relative overflow-hidden">
        
        {currentChannel ? (
          <>
            {/* WhatsApp Channel Top App Bar */}
            <div className="h-16 bg-[#f0f2f5] border-b border-[#d1d7db] px-4 flex items-center justify-between shrink-0 shadow-xs z-10">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentChannel.dp || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150'}
                  alt={currentChannel.name}
                  onClick={() => isChannelAdmin && setShowManageModal(true)}
                  className={`w-10 h-10 rounded-full object-cover border border-[#d1d7db] shrink-0 ${
                    isChannelAdmin ? 'cursor-pointer hover:opacity-90' : ''
                  }`}
                  title={isChannelAdmin ? 'Manage Channel DP & Profile' : currentChannel.name}
                />
                
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm sm:text-base font-bold text-[#111b21] truncate">
                      {currentChannel.name}
                    </h2>
                    {currentChannel.verified && (
                      <BadgeCheck className="w-4 h-4 text-[#00a884] shrink-0" title="Official Verified Channel" />
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-[#667781] truncate">
                    {currentChannel.subscribers?.length || 0} followers • {currentChannel.category || 'Official DAV Board'}
                  </p>
                </div>
              </div>

              {/* Action Buttons on Right */}
              <div className="flex items-center gap-2">
                {/* Copy Invite Link */}
                <button
                  type="button"
                  onClick={() => handleCopyInviteLink(currentChannel.inviteCode)}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-[#d1d7db] hover:bg-[#f0f2f5] text-[#111b21] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  title="Copy Channel Invite Link"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#00a884]" />
                  <span className="hidden md:inline">{copiedLink ? 'Copied Link!' : 'Invite Link'}</span>
                </button>

                {/* Manage Channel Button (Creator / Admin only) */}
                {isChannelAdmin ? (
                  <button
                    type="button"
                    onClick={() => setShowManageModal(true)}
                    className="relative px-3 py-1.5 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                    title="Manage Subscribers, Requests, and DP"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Manage Channel</span>
                    {currentChannel.pendingRequests?.length > 0 && (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1" />
                    )}
                  </button>
                ) : (
                  <div>
                    {isSubscriber ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Following</span>
                      </span>
                    ) : isRequestPending ? (
                      <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-black flex items-center gap-1">
                        <span>Pending Approval ⏳</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFollowOrRequest(currentChannel.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-black shadow-xs transition cursor-pointer flex items-center gap-1.5"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Follow Channel</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Delete Channel Option (Admins / Dimension 4 & 5) */}
                {(isChannelAdmin || canCreateChannel) && (
                  <button
                    type="button"
                    onClick={() => handleDeleteChannel(currentChannel.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 text-xs font-bold transition cursor-pointer"
                    title="Delete Channel"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Switch back to Direct 1-on-1 chats */}
                {onSwitchToChats && (
                  <button
                    type="button"
                    onClick={onSwitchToChats}
                    className="p-1.5 rounded-lg hover:bg-[#e9edef] text-[#54656f] text-xs font-bold transition cursor-pointer"
                    title="Back to Direct Chats"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Pinned Channel Description Header Banner */}
            <div className="bg-[#fff9e6] border-b border-[#ffe8a3] px-4 py-2.5 text-xs text-[#8c6b00] flex items-center justify-between gap-2 shadow-xs shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Bell className="w-4 h-4 text-[#d97706] shrink-0" />
                <span className="font-medium truncate">
                  <strong>About Channel:</strong> {currentChannel.description}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#fff0ba] px-2 py-0.5 rounded border border-[#ffe082] shrink-0">
                Code: {currentChannel.inviteCode}
              </span>
            </div>

            {/* Channel Messages Broadcast Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
              {/* Date Separator */}
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 rounded-lg bg-white/90 text-[#54656f] text-[11px] font-bold shadow-xs uppercase tracking-wider">
                  Official Channel Broadcast Feed
                </span>
              </div>

              {/* Feed Posts */}
              {(!currentChannel.posts || currentChannel.posts.length === 0) ? (
                <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-white text-center space-y-3 shadow-md border border-[#d1d7db]">
                  <div className="w-12 h-12 rounded-full bg-[#d9fdd3] text-[#008069] flex items-center justify-center mx-auto">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#111b21] text-sm">No Broadcasts Yet</h3>
                  <p className="text-xs text-[#667781]">
                    {isChannelAdmin 
                      ? 'You are the channel admin. Use the broadcast bar below to send announcements to your followers.'
                      : 'The channel admin will post verified circulars and study material here soon.'}
                  </p>
                </div>
              ) : (
                currentChannel.posts.map((post) => (
                  <div key={post.id} className="max-w-2xl mx-auto space-y-1.5 animate-fadeIn">
                    
                    {/* Message Bubble (WhatsApp Channel Style) */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#d1d7db]/80 space-y-2.5 relative">
                      {/* Author Header */}
                      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-[#f0f2f5]">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-[#008069]">{post.authorName}</span>
                          <span className="px-1.5 py-0.2 rounded bg-[#d9fdd3] text-[#008069] text-[9px] font-extrabold uppercase">
                            {post.authorRole || 'Channel Admin'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#667781] font-semibold">{post.timestamp}</span>
                          {(isChannelAdmin || canCreateChannel || post.authorId === user?.id) && (
                            <button
                              type="button"
                              onClick={() => handleDeletePost(post.id)}
                              className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              title="Delete broadcast message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Text Body */}
                      <p className="text-xs sm:text-sm text-[#111b21] leading-relaxed whitespace-pre-wrap font-medium">
                        {post.text}
                      </p>

                      {/* Interactive Reactions Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#f0f2f5]">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {['👍', '❤️', '🔥', '👏', '🎉'].map((emoji) => {
                            const count = post.reactions?.[emoji] || 0;
                            return (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => handleReactionClick(post.id, emoji)}
                                className={`px-2 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1 transition cursor-pointer ${
                                  count > 0 
                                    ? 'bg-[#f0f2f5] hover:bg-[#e9edef] text-[#111b21] border-[#d1d7db]' 
                                    : 'bg-white hover:bg-[#f0f2f5] text-[#667781] border-[#e9edef]'
                                }`}
                                title={`React with ${emoji}`}
                              >
                                <span>{emoji}</span>
                                {count > 0 && <span className="text-[10px] font-mono">{count}</span>}
                              </button>
                            );
                          })}
                        </div>

                        <span className="text-[10px] text-[#667781] font-mono flex items-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                          <span>Broadcast</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Bar: Composer for Admin OR Read-Only Notice for Followers */}
            <div className="p-3 bg-[#f0f2f5] border-t border-[#d1d7db] shrink-0">
              {isChannelAdmin ? (
                /* Admin Broadcast Composer */
                <form onSubmit={handleBroadcastSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-xl border border-[#d1d7db] px-3 py-2 flex items-center gap-2 shadow-xs focus-within:border-[#00a884] transition">
                    <input
                      type="text"
                      placeholder="Broadcast an official announcement to your followers..."
                      value={broadcastText}
                      onChange={(e) => setBroadcastText(e.target.value)}
                      className="w-full text-xs sm:text-sm font-medium text-[#111b21] placeholder-[#667781] focus:outline-none bg-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!broadcastText.trim()}
                    className="p-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] disabled:opacity-50 text-white transition cursor-pointer shadow-md flex items-center justify-center shrink-0"
                    title="Send Broadcast"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : isSubscriber ? (
                /* Read-Only Notice for Followers */
                <div className="max-w-2xl mx-auto py-2 text-center text-xs text-[#54656f] flex items-center justify-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#667781]" />
                  <span>
                    Only channel admins can post in this channel. You can read updates and react to announcements above.
                  </span>
                </div>
              ) : (
                /* Preview State: Follow Banner */
                <div className="max-w-2xl mx-auto p-2 bg-white rounded-xl border border-[#d1d7db] flex items-center justify-between gap-3 shadow-xs">
                  <div className="text-xs text-[#111b21]">
                    <strong>Want regular announcements?</strong> Follow this channel to receive live notifications.
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFollowOrRequest(currentChannel.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-black shadow-xs transition cursor-pointer shrink-0"
                  >
                    Follow Channel
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="m-auto text-center p-8 space-y-3 text-[#667781]">
            <Compass className="w-12 h-12 mx-auto text-[#00a884] opacity-50" />
            <h3 className="font-bold text-base text-[#111b21]">Select a Channel</h3>
            <p className="text-xs max-w-sm mx-auto">
              Choose an official DAV channel from the directory on the left, or join using an invite code.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE CHANNEL (DIMENSIONS 4 & 5 ONLY)                           */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#d1d7db] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#00a884] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5" />
                <h3 className="font-black text-sm sm:text-base">Create WhatsApp Channel</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition cursor-pointer text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleCreateChannelSubmit} className="p-6 space-y-4 text-xs font-bold text-[#111b21]">
              
              {/* DP Selection */}
              <div className="flex items-center gap-4">
                <img
                  src={createForm.dp}
                  alt="DP Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#00a884] shadow-md"
                />
                <div className="space-y-1 flex-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#54656f]">Channel Profile Picture (DP)</label>
                  <input
                    type="text"
                    value={createForm.dp}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, dp: e.target.value }))}
                    placeholder="Enter image URL or pick preset below"
                    className="w-full p-2 bg-[#f0f2f5] border border-transparent rounded-lg text-xs font-medium focus:bg-white focus:border-[#00a884] outline-none"
                  />
                  {/* Preset Avatars */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {[
                      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150',
                      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150',
                      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150',
                      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150'
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCreateForm(prev => ({ ...prev, dp: preset }))}
                        className="w-6 h-6 rounded-full overflow-hidden border hover:border-[#00a884] transition cursor-pointer"
                      >
                        <img src={preset} alt={`preset ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Channel Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#54656f]">Channel Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 8-D Mathematics & Science Mastery"
                  value={createForm.name}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2.5 bg-[#f0f2f5] border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-[#00a884] outline-none transition"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#54656f]">Category / Subject</label>
                <select
                  value={createForm.category}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2.5 bg-[#f0f2f5] border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-[#00a884] outline-none transition"
                >
                  <option value="Academics & Board Prep">Academics &amp; Board Prep</option>
                  <option value="Teacher Subject Circular">Teacher Subject Circular</option>
                  <option value="Science & Mathematics Olympiad">Science &amp; Mathematics Olympiad</option>
                  <option value="Sports & Campus Activities">Sports &amp; Campus Activities</option>
                  <option value="Official DAVCMC Notices">Official DAVCMC Notices</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#54656f]">Description (What will you broadcast?)</label>
                <textarea
                  rows={3}
                  placeholder="Describe the purpose of your channel for students and parents..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2.5 bg-[#f0f2f5] border border-transparent rounded-xl text-xs font-medium focus:bg-white focus:border-[#00a884] outline-none transition resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#d9fdd3] text-[#008069] text-[11px] space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized for Dimension {isDimension5 ? '5 (Faculty)' : '4 (Developer Master)'}</span>
                </p>
                <p>Anyone with your invite link can discover and join your channel. Followers cannot spam or answer, ensuring 100% clean official announcements.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#f0f2f5]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#f0f2f5] hover:bg-[#e9edef] text-[#54656f] text-xs font-bold cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-black shadow-md cursor-pointer transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Channel</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DIMENSION RESTRICTION MODAL (DIMENSIONS 1 TO 3)                  */}
      {/* ========================================================================= */}
      {showRestrictionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#d1d7db] p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-0.5 rounded-full">
                Dimension 4 &amp; 5 Feature Only
              </span>
              <h3 className="text-lg font-black text-[#111b21]">
                Channel Creation Restricted
              </h3>
              <p className="text-xs text-[#54656f] leading-relaxed">
                As per DAV website policy, only <strong>Dimension 5 (Teachers &amp; Faculty)</strong> and <strong>Dimension 4 (Developer Masters)</strong> are authorized to create broadcasting WhatsApp Channels.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f0f2f5] text-left text-xs text-[#111b21] space-y-2">
              <div className="font-bold text-[#00a884] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your Student &amp; Member Permissions:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[#54656f] text-[11px]">
                <li>Explore &amp; search all verified teacher channels.</li>
                <li>Join any channel using an official Invite Code or Link.</li>
                <li>Read live circulars, question banks, and class timetables.</li>
                <li>Interact and react with emojis to announcements.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowRestrictionModal(false);
                setChannelTab('explore');
              }}
              className="w-full py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-black shadow-md cursor-pointer transition flex items-center justify-center gap-2"
            >
              <span>Explore Channels to Follow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: MANAGE CHANNEL & SUBSCRIBERS (OWNER / DIM 4 & 5)                  */}
      {/* ========================================================================= */}
      {showManageModal && currentChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#d1d7db] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-4 bg-[#f0f2f5] border-b border-[#d1d7db] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Settings className="w-5 h-5 text-[#00a884]" />
                <div>
                  <h3 className="font-bold text-sm text-[#111b21]">Manage: {currentChannel.name}</h3>
                  <p className="text-[10px] text-[#667781]">Subscriber Roster, Join Requests, &amp; Profile DP</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowManageModal(false)}
                className="w-7 h-7 rounded-full bg-white hover:bg-stone-200 border border-[#d1d7db] flex items-center justify-center transition cursor-pointer text-[#111b21]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs in Manage Modal */}
            <div className="flex border-b border-[#d1d7db] bg-[#fafafa] text-xs font-bold text-[#54656f]">
              <button
                type="button"
                onClick={() => setManageTab('profile')}
                className={`flex-1 py-3 border-b-2 text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  manageTab === 'profile' ? 'border-[#00a884] text-[#00a884] bg-white' : 'border-transparent hover:text-[#111b21]'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Profile &amp; DP</span>
              </button>

              <button
                type="button"
                onClick={() => setManageTab('requests')}
                className={`flex-1 py-3 border-b-2 text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  manageTab === 'requests' ? 'border-[#00a884] text-[#00a884] bg-white' : 'border-transparent hover:text-[#111b21]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join Requests</span>
                {currentChannel.pendingRequests?.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black">
                    {currentChannel.pendingRequests.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setManageTab('subscribers')}
                className={`flex-1 py-3 border-b-2 text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  manageTab === 'subscribers' ? 'border-[#00a884] text-[#00a884] bg-white' : 'border-transparent hover:text-[#111b21]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Subscribers ({currentChannel.subscribers?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setManageTab('invite')}
                className={`flex-1 py-3 border-b-2 text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  manageTab === 'invite' ? 'border-[#00a884] text-[#00a884] bg-white' : 'border-transparent hover:text-[#111b21]'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Invite Link</span>
              </button>
            </div>

            {/* Modal Body Based on Tab */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              
              {/* TAB 1: PROFILE & DP */}
              {manageTab === 'profile' && (
                <form onSubmit={handleSaveChannelProfile} className="space-y-4 text-xs font-bold text-[#111b21]">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f0f2f5]">
                    <img
                      src={manageForm.dp || currentChannel.dp}
                      alt="Channel DP"
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#00a884] shadow-md shrink-0"
                    />
                    <div className="space-y-1.5 flex-1">
                      <label className="text-[11px] font-black uppercase text-[#54656f]">Channel Profile Picture (DP)</label>
                      <input
                        type="text"
                        value={manageForm.dp}
                        onChange={(e) => setManageForm(prev => ({ ...prev, dp: e.target.value }))}
                        placeholder="Paste image URL or choose preset"
                        className="w-full p-2 bg-white border border-[#d1d7db] rounded-lg text-xs outline-none focus:border-[#00a884]"
                      />
                      <div className="flex items-center gap-2 pt-1">
                        {[
                          'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150',
                          'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150',
                          'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150',
                          'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150'
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setManageForm(prev => ({ ...prev, dp: preset }))}
                            className="w-7 h-7 rounded-full overflow-hidden border hover:border-[#00a884] transition cursor-pointer"
                          >
                            <img src={preset} alt={`preset ${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-[#54656f]">Channel Name</label>
                    <input
                      type="text"
                      required
                      value={manageForm.name}
                      onChange={(e) => setManageForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2.5 bg-[#f0f2f5] border border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-[#00a884]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-[#54656f]">Category / Subject</label>
                    <input
                      type="text"
                      value={manageForm.category}
                      onChange={(e) => setManageForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2.5 bg-[#f0f2f5] border border-transparent rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-[#00a884]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-[#54656f]">Description</label>
                    <textarea
                      rows={3}
                      value={manageForm.description}
                      onChange={(e) => setManageForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-2.5 bg-[#f0f2f5] border border-transparent rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-[#00a884] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-black text-xs shadow-md transition cursor-pointer"
                  >
                    Save Channel Details &amp; DP
                  </button>
                </form>
              )}

              {/* TAB 2: PENDING JOIN REQUESTS */}
              {manageTab === 'requests' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-[#111b21]">Pending Membership Requests</h4>
                      <p className="text-[11px] text-[#667781]">Students who clicked "Follow / Request to Join" from the directory</p>
                    </div>
                    {currentChannel.pendingRequests?.length > 0 && (
                      <button
                        type="button"
                        onClick={handleAcceptAllRequests}
                        className="px-3 py-1.5 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-black shadow-xs transition cursor-pointer"
                      >
                        Accept All ({currentChannel.pendingRequests.length})
                      </button>
                    )}
                  </div>

                  {(!currentChannel.pendingRequests || currentChannel.pendingRequests.length === 0) ? (
                    <div className="py-12 text-center text-[#667781] space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-[#00a884] mx-auto opacity-40" />
                      <p className="font-bold text-xs text-[#111b21]">No pending requests</p>
                      <p className="text-[11px]">When students request to follow your channel, they will appear here for your approval.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#f0f2f5] border border-[#d1d7db] rounded-2xl overflow-hidden">
                      {currentChannel.pendingRequests.map((req) => (
                        <div key={req.id} className="p-3.5 flex items-center justify-between gap-3 bg-white hover:bg-[#f7f8fa] transition">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#d9fdd3] text-[#008069] font-black text-xs flex items-center justify-center">
                              {req.userName?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#111b21]">{req.userName}</p>
                              <p className="text-[10px] text-[#667781]">Class {req.classNum} • Roll No: {req.rollNo} • {req.requestedAt}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleAcceptRequest(req.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeclineRequest(req.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#f0f2f5] hover:bg-rose-50 text-[#54656f] hover:text-rose-600 text-xs font-bold transition cursor-pointer"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SUBSCRIBERS LIST & ADD PEOPLE */}
              {manageTab === 'subscribers' && (
                <div className="space-y-4">
                  {/* Add Student Section */}
                  <div className="p-3.5 rounded-2xl bg-[#f0f2f5] space-y-2">
                    <h5 className="font-black text-xs text-[#111b21] flex items-center gap-1.5">
                      <UserPlus className="w-4 h-4 text-[#00a884]" />
                      <span>Add Student / Member Directly</span>
                    </h5>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2 text-[#54656f]" />
                      <input
                        type="text"
                        placeholder="Search student by name or class to add..."
                        value={newMemberSearch}
                        onChange={(e) => setNewMemberSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#d1d7db] rounded-lg text-xs outline-none focus:border-[#00a884]"
                      />
                    </div>

                    {availableRegisteredStudents.length > 0 && (
                      <div className="max-h-36 overflow-y-auto divide-y divide-[#d1d7db] bg-white rounded-xl border border-[#d1d7db] mt-1">
                        {availableRegisteredStudents.slice(0, 6).map((std) => (
                          <div key={std.id} className="p-2 px-3 flex items-center justify-between text-xs">
                            <span className="font-bold text-[#111b21]">{std.name} (Class {std.classNum || '8'})</span>
                            <button
                              type="button"
                              onClick={() => handleAddMemberDirectly(std)}
                              className="px-2.5 py-0.5 rounded bg-[#d9fdd3] hover:bg-[#00a884] text-[#008069] hover:text-white text-[10px] font-bold transition cursor-pointer"
                            >
                              + Add to Channel
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Current Subscribers */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs text-[#111b21]">
                      Current Channel Members ({currentChannel.subscribers?.length || 0})
                    </h5>

                    <div className="divide-y divide-[#f0f2f5] border border-[#d1d7db] rounded-2xl overflow-hidden bg-white">
                      {(currentChannel.subscribers || []).map((sub) => {
                        const isSelf = sub.id === user?.id;
                        const isChannelOwner = sub.role === 'owner';

                        return (
                          <div key={sub.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00a884] to-[#25d366] text-white font-bold flex items-center justify-center text-xs">
                                {sub.name?.charAt(0) || 'U'}
                              </div>
                              <div>
                                <p className="font-bold text-[#111b21] flex items-center gap-1.5">
                                  <span>{sub.name}</span>
                                  {isChannelOwner && (
                                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-black">
                                      Owner
                                    </span>
                                  )}
                                </p>
                                <span className="text-[10px] text-[#667781] capitalize">{sub.role || 'Member'}</span>
                              </div>
                            </div>

                            {!isChannelOwner && !isSelf && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSubscriber(sub.id)}
                                className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                              >
                                <UserMinus className="w-3 h-3" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: INVITE LINK & CODE */}
              {manageTab === 'invite' && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#d9fdd3] text-[#008069] flex items-center justify-center mx-auto shadow-sm">
                    <Share2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-sm text-[#111b21]">Share Channel Invite Link</h4>
                    <p className="text-xs text-[#667781] max-w-sm mx-auto">
                      Anyone with this code or link can immediately join your channel and follow all broadcasts.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#f0f2f5] border border-[#d1d7db] space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-wider text-[#54656f]">Official Invite Code</div>
                    <div className="font-mono text-xl font-black text-[#00a884] tracking-wider select-all">
                      {currentChannel.inviteCode}
                    </div>
                    <div className="text-[10px] text-[#667781] select-all font-mono">
                      dav://whatsapp/channel/{currentChannel.inviteCode}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyInviteLink(currentChannel.inviteCode)}
                      className="px-6 py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-black shadow-md transition cursor-pointer flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Invite Link'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: JOIN WITH INVITE CODE MODAL                                      */}
      {/* ========================================================================= */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#d1d7db] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-[#00a884]" />
                <h3 className="font-black text-sm text-[#111b21]">Join Channel via Invite</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="w-7 h-7 rounded-full bg-[#f0f2f5] hover:bg-[#e9edef] flex items-center justify-center transition cursor-pointer text-[#111b21]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#54656f]">
              Enter the invite code or link provided by your teacher (e.g., <strong>DAV-8D-TOPPER</strong> or <strong>DAV-CMC-2026</strong>) to join instantly.
            </p>

            <form onSubmit={handleJoinWithCode} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Enter Invite Code (e.g. DAV-8D-TOPPER)"
                value={selectedInviteCodeInput}
                onChange={(e) => setSelectedInviteCodeInput(e.target.value)}
                className="w-full p-3 bg-[#f0f2f5] border border-transparent rounded-xl text-xs font-bold uppercase tracking-wider text-[#111b21] outline-none focus:bg-white focus:border-[#00a884]"
              />

              {inviteError && (
                <div className="p-2.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                  {inviteError}
                </div>
              )}

              {inviteSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  {inviteSuccess}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-black shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Join Channel Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Simple Link Icon helper for clean syntax
function LinkIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default WhatsAppChannelsModule;
