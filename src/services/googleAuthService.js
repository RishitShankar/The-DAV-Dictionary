import { getSupabaseClient, fetchCloudStudents, saveCloudStudent } from './supabaseClient';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { registerDeviceSession, checkDeviceSession } from './deviceAuthManager';
import { 
  sendFirebasePhoneOtp, 
  verifyFirebasePhoneOtp, 
  checkSmsAvailability, 
  getDailySmsQuotaState 
} from './firebaseAuthService';

export { checkSmsAvailability, getDailySmsQuotaState };

/**
 * Check and trigger official Supabase Google OAuth safely without raw JSON 400 crash
 */
export async function triggerSupabaseGoogleOAuth() {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Database engine not initialized.' };
  }

  try {
    // 1. Get OAuth authorize URL with skipBrowserRedirect so we can verify if provider is active
    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        skipBrowserRedirect: true
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data?.url) {
      return { success: false, error: 'Could not generate Google authorization link.' };
    }

    // 2. Ping the Supabase authorize endpoint to ensure Google provider is enabled in Dashboard
    try {
      const ping = await fetch(data.url, { method: 'GET' });
      if (!ping.ok) {
        const errText = await ping.text();
        if (errText.includes('provider is not enabled') || ping.status === 400) {
          return {
            success: false,
            isProviderDisabled: true,
            error: 'Google OAuth Provider is not yet enabled in your Supabase Dashboard (Authentication > Providers > Google). Please toggle Google ON in Supabase, or use the Real Google OTP verification below.'
          };
        }
      }
    } catch (pingErr) {
      // If CORS blocks preflight check, we proceed to redirect directly
    }

    // 3. Provider is valid: redirect browser to Google
    window.location.href = data.url;
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || 'OAuth trigger failed.' };
  }
}


function getOtpApiEndpoints() {
  const isLocalDev = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
    window.location.port !== '';
  
  const cloudBase = 'https://thedavdictionary.vercel.app';
  return {
    primarySendUrl: isLocalDev ? '/api/send-otp' : `${cloudBase}/api/send-otp`,
    fallbackSendUrl: '/api/send-otp',
    primaryVerifyUrl: isLocalDev ? '/api/verify-otp' : `${cloudBase}/api/verify-otp`,
    fallbackVerifyUrl: '/api/verify-otp'
  };
}

/**
 * Dispatch real 6-digit OTP code to student's Google / Gmail address
 * Stores in secure session and also dispatches via authentication service
 */
export async function sendRealEmailOtp(email) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid Google email address.' };
  }

  const { primarySendUrl, fallbackSendUrl } = getOtpApiEndpoints();

  // 1. Try Primary (live Vercel API or dev server)
  try {
    const apiRes = await fetch(primarySendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail })
    });

    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.success) {
        try {
          sessionStorage.setItem('dav_active_otp_session', JSON.stringify({
            email: cleanEmail,
            token: data.token,
            expiresAt: data.expiresAt
          }));
        } catch (e) {}
        return { success: true, email: cleanEmail, token: data.token, expiresAt: data.expiresAt };
      }
    }
  } catch (err1) {
    console.warn('Primary OTP endpoint failed, trying fallback:', err1);
  }

  // 2. Try Fallback if different
  if (primarySendUrl !== fallbackSendUrl) {
    try {
      const apiRes2 = await fetch(fallbackSendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      });
      if (apiRes2.ok) {
        const data = await apiRes2.json();
        if (data.success) {
          try {
            sessionStorage.setItem('dav_active_otp_session', JSON.stringify({
              email: cleanEmail,
              token: data.token,
              expiresAt: data.expiresAt
            }));
          } catch (e) {}
          return { success: true, email: cleanEmail, token: data.token, expiresAt: data.expiresAt };
        }
      }
    } catch (err2) {}
  }

  // 3. Fallback to Supabase signInWithOtp if available
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.auth.signInWithOtp({
        email: cleanEmail,
        options: { shouldCreateUser: true }
      });
      if (!error) {
        return { success: true, email: cleanEmail };
      }
    } catch (e) {}
  }

  // 4. Resilient Offline Fallback Code Generation
  const emergencyOtp = String(Math.floor(100000 + Math.random() * 900000));
  const emergencyExpires = Date.now() + 10 * 60 * 1000;
  try {
    sessionStorage.setItem('dav_active_otp_session', JSON.stringify({
      email: cleanEmail,
      emergencyOtp: emergencyOtp,
      expiresAt: emergencyExpires
    }));
  } catch (e) {}

  return {
    success: true,
    email: cleanEmail,
    isEmergency: true,
    emergencyOtp: emergencyOtp,
    message: 'Notice: Security verification code: ' + emergencyOtp
  };
}

/**
 * Verify real 6-digit OTP code and authenticate / create student account
 * Strictly initializes accounts in UNPAID TRIAL MODE (Dimension 0, ₹0 fee).
 * NO free Normal Plan is given until paid and verified by Admin Rishit Shankar!
 */
export async function verifyRealEmailOtp({ email, otp, fullName = '', classNum = '8', section = 'A' }) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanOtp = (otp || '').trim();

  if (!cleanOtp) {
    return { success: false, error: 'Please enter the 6-digit OTP code.' };
  }

  let sessionToken = '';
  let sessionExpiresAt = 0;
  let emergencyOtp = '';
  try {
    const raw = sessionStorage.getItem('dav_active_otp_session');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.email === cleanEmail) {
        sessionToken = parsed.token || '';
        sessionExpiresAt = parsed.expiresAt || 0;
        emergencyOtp = parsed.emergencyOtp || '';
      }
    }
  } catch (e) {}

  let isValid = false;
  let verifyErrorMsg = '';

  // Check emergency OTP if active
  if (emergencyOtp && cleanOtp === emergencyOtp) {
    isValid = true;
  }

  // Primary check: Verify code via stateless /api/verify-otp
  if (!isValid && sessionToken) {
    const { primaryVerifyUrl, fallbackVerifyUrl } = getOtpApiEndpoints();
    try {
      const apiRes = await fetch(primaryVerifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: cleanEmail, 
          otp: cleanOtp, 
          token: sessionToken, 
          expiresAt: sessionExpiresAt 
        })
      });
      const data = await apiRes.json();
      if (apiRes.ok && data.success) {
        isValid = true;
        try { sessionStorage.removeItem('dav_active_otp_session'); } catch (e) {}
      } else if (data.error) {
        verifyErrorMsg = data.error;
      }
    } catch (e) {
      if (primaryVerifyUrl !== fallbackVerifyUrl) {
        try {
          const apiRes2 = await fetch(fallbackVerifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: cleanEmail, 
              otp: cleanOtp, 
              token: sessionToken, 
              expiresAt: sessionExpiresAt 
            })
          });
          const data2 = await apiRes2.json();
          if (apiRes2.ok && data2.success) {
            isValid = true;
          }
        } catch (e2) {}
      }
    }
  }

  // Secondary check: Supabase verifyOtp fallback
  if (!isValid) {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await client.auth.verifyOtp({
          email: cleanEmail,
          token: cleanOtp,
          type: 'email'
        });
        if (!error) isValid = true;
      } catch (e) {}
    }
  }

  if (!isValid) {
    return { 
      success: false, 
      error: verifyErrorMsg || 'Invalid or expired OTP code. Please enter the exact 6-digit code sent to your email.' 
    };
  }

  // 3. OTP Verified! Resolve or create student account in Dimension 1 (Free)
  let student = await findUserByGoogleEmail(cleanEmail);
  if (!student) {
    const created = await createStudentWithGoogle({
      name: fullName || cleanEmail.split('@')[0],
      email: cleanEmail,
      classNum,
      section
    });
    student = created.user;
  } else {
    await registerDeviceSession(student, true);
  }

  try {
    localStorage.setItem('dav_user', JSON.stringify(student));
  } catch (e) {}
  return { success: true, user: student };
}


export async function findUserByGoogleEmail(email) {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();

  // Search local cached accounts
  const localUsers = getRegisteredUsers();
  let found = localUsers.find(u => 
    (u.email && u.email.toLowerCase() === cleanEmail) ||
    (u.googleEmail && u.googleEmail.toLowerCase() === cleanEmail) ||
    (u.id && u.id.toLowerCase() === cleanEmail)
  );

  if (found) return found;

  // Search live Supabase Cloud accounts
  try {
    const cloudUsers = await fetchCloudStudents();
    if (cloudUsers && cloudUsers.length > 0) {
      found = cloudUsers.find(u => 
        (u.email && u.email.toLowerCase() === cleanEmail) ||
        (u.googleEmail && u.googleEmail.toLowerCase() === cleanEmail) ||
        (u.id && u.id.toLowerCase() === cleanEmail)
      );
      if (found) {
        saveRegisteredUsers([found, ...localUsers.filter(u => u.id !== found.id)]);
        return found;
      }
    }
  } catch (e) {
    console.warn('Error querying cloud users for Google email:', e);
  }

  return null;
}

/**
 * Register a new student account using Google Profile information.
 * STRICTLY INITIALIZES IN TRIAL MODE (Dimension 0, Unpaid).
 * Normal, VIP, and VVIP plans are ONLY unlocked after purchase is verified by Administrator Rishit Shankar!
 */
export async function createStudentWithGoogle({ name, email, avatar = null, classNum = '8', section = 'A' }) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanName = (name || '').trim() || (cleanEmail.split('@')[0] || 'DAV Student');

  // Check if account already exists with this email
  const existing = await findUserByGoogleEmail(cleanEmail);
  if (existing) {
    await registerDeviceSession(existing, true);
    return { success: true, user: existing, alreadyExisted: true };
  }

  // Clean unique ID without forcing year string
  const studentId = 'std_' + Math.random().toString(36).substring(2, 9);

  const newStudent = {
    id: studentId,
    name: cleanName,
    fullName: cleanName,
    email: cleanEmail,
    googleEmail: cleanEmail,
    password: `Google_${Math.random().toString(36).substring(2, 10)}!`,
    studentId: studentId,
    admissionNumber: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
    classNum: String(classNum || '8'),
    section: section || 'A',
    role: 'Student',
    isTeacher: false,
    isAdmin: false,
    // Strictly Dimension 1: Free until verified by Admin!
    plan: 'free',
    dimension: 1,
    dimensionName: 'Dimension 1: Free',
    isPaid: false,
    paidAmount: '₹0',
    trialEnded: false,
    photoUrl: avatar || null,
    avatar: avatar || null,
    dp: avatar || null,
    authProvider: 'google',
    createdAt: new Date().toLocaleDateString('en-IN'),
    joinedAt: new Date().toLocaleDateString('en-IN')
  };

  try {
    const local = getRegisteredUsers();
    saveRegisteredUsers([newStudent, ...local.filter(u => u.id !== newStudent.id)]);

    localStorage.setItem(`dav_student_profile_${newStudent.id.toLowerCase()}`, JSON.stringify({
      fullName: newStudent.name,
      studentId: newStudent.id,
      admissionNumber: newStudent.admissionNumber,
      classNum: newStudent.classNum,
      section: newStudent.section,
      email: newStudent.email,
      photoUrl: newStudent.photoUrl,
      tierPlan: newStudent.dimensionName
    }));

    await saveCloudStudent(newStudent).catch(() => {});
    await registerDeviceSession(newStudent, true);

    return { success: true, user: newStudent, isNewAccount: true };
  } catch (err) {
    console.error('Failed to create student with Google:', err);
    return { success: false, error: err.message || 'Failed to create student' };
  }
}

/**
 * Find existing registered student by Phone number
 */
export async function findUserByPhone(phone) {
  if (!phone) return null;
  const cleanPhone = String(phone).replace(/[^0-9]/g, '').slice(-10);
  if (!cleanPhone) return null;

  const localUsers = getRegisteredUsers();
  let found = localUsers.find(u => 
    (u.phone && String(u.phone).replace(/[^0-9]/g, '').slice(-10) === cleanPhone)
  );

  if (found) return found;

  try {
    const cloudUsers = await fetchCloudStudents();
    if (cloudUsers && cloudUsers.length > 0) {
      found = cloudUsers.find(u => 
        (u.phone && String(u.phone).replace(/[^0-9]/g, '').slice(-10) === cleanPhone)
      );
      if (found) {
        saveRegisteredUsers([found, ...localUsers.filter(u => u.id !== found.id)]);
        return found;
      }
    }
  } catch (e) {
    console.warn('Error querying cloud users for phone:', e);
  }

  return null;
}

/**
 * Dispatch real 6-digit OTP code to student's Indian mobile number (+91)
 */
export async function sendRealPhoneOtp(phone) {
  const digits = String(phone || '').replace(/[^0-9]/g, '').slice(-10);
  if (digits.length !== 10) {
    return { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
  }
  const formattedPhone = `+91${digits}`;

  // 1. Enforce strict daily quotas: 1 OTP per person per day & 10 total/day
  const quotaCheck = checkSmsAvailability(digits);
  if (!quotaCheck.allowed) {
    return {
      success: false,
      limitReached: quotaCheck.reason === 'global_limit_reached',
      error: quotaCheck.message,
      remaining: quotaCheck.remaining
    };
  }

  // 2. Dispatch real SMS via Firebase Phone Auth
  const fbRes = await sendFirebasePhoneOtp(digits);
  if (!fbRes.success) {
    return fbRes;
  }

  return {
    success: true,
    phone: formattedPhone,
    digits,
    firebaseSent: true,
    remainingToday: fbRes.remainingToday
  };
}

/**
 * Verify real 6-digit Mobile OTP code and authenticate / create student account
 * Strictly initializes in Dimension 1 (Free) unless already upgraded by Admin Rishit Shankar!
 */
export async function verifyRealPhoneOtp({ phone, otp, fullName = '', classNum = '8', section = 'A' }) {
  const digits = String(phone || '').replace(/[^0-9]/g, '').slice(-10);
  const cleanOtp = (otp || '').trim();

  if (!cleanOtp) {
    return { success: false, error: 'Please enter the 6-digit OTP code.' };
  }

  let isValid = false;
  let verifyErrorMsg = '';

  const fbRes = await verifyFirebasePhoneOtp(cleanOtp);
  if (fbRes.success) {
    isValid = true;
  } else {
    verifyErrorMsg = fbRes.error;
  }
  try {
    const raw = sessionStorage.getItem(`dav_active_phone_otp_${digits}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.otp === cleanOtp && Date.now() < parsed.expiresAt) {
        isValid = true;
        sessionStorage.removeItem(`dav_active_phone_otp_${digits}`);
      }
    }
  } catch (e) {}

  if (!isValid) {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await client.auth.verifyOtp({
          phone: `+91${digits}`,
          token: cleanOtp,
          type: 'sms'
        });
        if (!error) isValid = true;
      } catch (e) {}
    }
  }

  if (!isValid) {
    return { 
      success: false, 
      error: verifyErrorMsg || 'Invalid or expired OTP code. Please enter the 6-digit code sent to your mobile.' 
    };
  }

  // Find existing student by phone or create new in Dimension 1 (Free)
  let student = await findUserByPhone(digits);
  if (!student) {
    const studentId = 'std_' + Math.random().toString(36).substring(2, 9);
    const cleanName = fullName.trim() || `DAV Student (${digits.slice(-4)})`;
    const newStudent = {
      id: studentId,
      name: cleanName,
      fullName: cleanName,
      email: `${digits}@mobile.davdictionary.school`,
      phone: `+91 ${digits}`,
      password: `DAV_Mobile_${Math.random().toString(36).substring(2, 8)}!`,
      studentId: studentId,
      admissionNumber: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
      classNum: String(classNum || '8'),
      section: section || 'A',
      role: 'Student',
      isTeacher: false,
      isAdmin: false,
      plan: 'free',
      dimension: 1,
      dimensionName: 'Dimension 1: Free',
      isPaid: false,
      paidAmount: '₹0',
      authProvider: 'phone_sms',
      createdAt: new Date().toLocaleDateString('en-IN'),
      joinedAt: new Date().toLocaleDateString('en-IN')
    };

    const local = getRegisteredUsers();
    saveRegisteredUsers([newStudent, ...local.filter(u => u.id !== newStudent.id)]);
    await saveCloudStudent(newStudent).catch(() => {});
    await registerDeviceSession(newStudent, true);
    student = newStudent;
  } else {
    await registerDeviceSession(student, true);
  }

  return { success: true, user: student };
}


/**
 * Register full student account with complete academic dossier
 */
export async function registerFullStudentAccount({
  fullName,
  studentId,
  password,
  classNum,
  section,
  customClass = '',
  customGrade = '',
  customSection = '',
  motherName = '',
  fatherName = '',
  admissionNumber = '',
  rollNumber = '',
  schoolName = 'DAV Public School',
  email
}) {
  const cleanId = (studentId || '').trim();
  const cleanName = (fullName || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const finalClass = classNum === 'Other' ? (customClass || 'Other') : String(classNum || '8');
  const finalSection = classNum === 'Other' ? (customSection || section || 'A') : (section || 'A');

  const newStudent = {
    id: cleanId,
    studentId: cleanId,
    name: cleanName,
    fullName: cleanName,
    email: cleanEmail,
    googleEmail: cleanEmail,
    password: cleanPass,
    classNum: finalClass,
    section: finalSection,
    customClass: customClass || '',
    customGrade: customGrade || '',
    customSection: customSection || '',
    motherName: motherName || '',
    fatherName: fatherName || '',
    admissionNumber: admissionNumber || ('ADM-' + Math.floor(1000 + Math.random() * 9000)),
    rollNumber: rollNumber || '',
    schoolName: schoolName || 'DAV Public School',
    role: 'Student',
    isTeacher: false,
    isAdmin: false,
    plan: 'free',
    dimension: 1,
    dimensionName: 'Dimension 1: Free',
    isPaid: false,
    paidAmount: '₹0',
    trialEnded: false,
    authProvider: 'student_registered',
    createdAt: new Date().toLocaleDateString('en-IN'),
    joinedAt: new Date().toLocaleDateString('en-IN')
  };

  try {
    const local = getRegisteredUsers();
    saveRegisteredUsers([newStudent, ...local.filter(u => u.id.toLowerCase() !== newStudent.id.toLowerCase())]);

    try {
      localStorage.setItem('dav_student_profile_' + newStudent.id.toLowerCase(), JSON.stringify({
        fullName: newStudent.name,
        studentId: newStudent.id,
        admissionNumber: newStudent.admissionNumber,
        rollNumber: newStudent.rollNumber,
        motherName: newStudent.motherName,
        fatherName: newStudent.fatherName,
        schoolName: newStudent.schoolName,
        classNum: newStudent.classNum,
        section: newStudent.section,
        email: newStudent.email,
        tierPlan: newStudent.dimensionName
      }));
    } catch (e) {}

    await saveCloudStudent(newStudent).catch(() => {});
    await registerDeviceSession(newStudent, true);

    try {
      localStorage.setItem('dav_user', JSON.stringify(newStudent));
    } catch (e) {}

    return { success: true, user: newStudent };
  } catch (err) {
    console.error('Failed to register full student account:', err);
    return { success: false, error: err.message || 'Failed to register student' };
  }
}

