import { getSupabaseClient, fetchCloudStudents, saveCloudStudent } from './supabaseClient';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { registerDeviceSession, checkDeviceSession } from './deviceAuthManager';

/**
 * Trigger official Supabase Google OAuth redirect to accounts.google.com
 */
export async function triggerSupabaseGoogleOAuth() {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Authentication engine not initialized' };
  }
  try {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message || 'OAuth trigger failed' };
  }
}

/**
 * Dispatch real 6-digit OTP code to the student's Google / Gmail address
 */
export async function sendRealEmailOtp(email) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid Google email address.' };
  }

  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Database connection offline.' };
  }

  try {
    const { data, error } = await client.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        shouldCreateUser: true
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message || 'Failed to send OTP.' };
  }
}

/**
 * Verify real OTP received by student and authenticate / create their account
 */
export async function verifyRealEmailOtp({ email, otp, fullName = '', classNum = '8', section = 'A' }) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanOtp = (otp || '').trim();

  if (!cleanOtp) {
    return { success: false, error: 'Please enter the 6-digit OTP code.' };
  }

  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Authentication service unavailable.' };
  }

  try {
    const { data, error } = await client.auth.verifyOtp({
      email: cleanEmail,
      token: cleanOtp,
      type: 'email'
    });

    if (error) {
      return { success: false, error: error.message || 'Invalid or expired OTP code. Please check your Gmail.' };
    }

    // OTP Verified! Now resolve or create the student account
    let student = await findUserByGoogleEmail(cleanEmail);
    if (!student) {
      const created = await createStudentWithGoogle({
        name: fullName || (cleanEmail.split('@')[0]),
        email: cleanEmail,
        classNum,
        section
      });
      student = created.user;
    } else {
      await registerDeviceSession(student, true);
    }

    return { success: true, user: student, session: data.session };
  } catch (err) {
    return { success: false, error: err.message || 'Verification failed.' };
  }
}

/**
 * Find existing registered student by Google email
 */
export async function findUserByGoogleEmail(email) {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();

  // 1. Search local cached accounts
  const localUsers = getRegisteredUsers();
  let found = localUsers.find(u => 
    (u.email && u.email.toLowerCase() === cleanEmail) ||
    (u.googleEmail && u.googleEmail.toLowerCase() === cleanEmail) ||
    (u.id && u.id.toLowerCase() === cleanEmail)
  );

  if (found) return found;

  // 2. Search live Supabase Cloud accounts
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
 * Register a new student account using Google Profile information
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

  // Generate clean unique ID (no forced year string)
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
    plan: 'normal',
    dimension: 1,
    dimensionName: 'Dimension 1: Normal Plan',
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
