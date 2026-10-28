import { getSupabaseClient, fetchCloudStudents, saveCloudStudent } from './supabaseClient';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { registerDeviceSession, checkDeviceSession } from './deviceAuthManager';

/**
 * Attempt real Supabase Google OAuth redirect
 */
export async function triggerSupabaseGoogleOAuth() {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Supabase client not initialized' };
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
 * Find existing registered student by Google email or ID
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
        // Cache locally
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
    const sessionCheck = await checkDeviceSession(existing.id);
    await registerDeviceSession(existing, true);
    return { success: true, user: existing, alreadyExisted: true };
  }

  // Generate unique Student ID
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const studentId = `DAV-2026-${randomNum}`;

  const newStudent = {
    id: studentId,
    name: cleanName,
    fullName: cleanName,
    email: cleanEmail,
    googleEmail: cleanEmail,
    password: `Google_${Math.random().toString(36).substring(2, 10)}!`,
    studentId: studentId,
    admissionNumber: `ADM-${studentId}`,
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
    // Save to local storage
    const local = getRegisteredUsers();
    saveRegisteredUsers([newStudent, ...local.filter(u => u.id !== newStudent.id)]);

    // Save student profile storage
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

    // Sync to Supabase Cloud Database
    await saveCloudStudent(newStudent).catch(() => {});

    // Register single device session
    await registerDeviceSession(newStudent, true);

    return { success: true, user: newStudent, isNewAccount: true };
  } catch (err) {
    console.error('Failed to create student with Google:', err);
    return { success: false, error: err.message || 'Failed to create student' };
  }
}

/**
 * Handle direct Login with Google
 */
export async function loginWithGoogle({ email }) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail) {
    return { success: false, error: 'Please provide a valid Google email.' };
  }

  const existing = await findUserByGoogleEmail(cleanEmail);
  if (!existing) {
    return { 
      success: false, 
      notFound: true, 
      error: `No DAV Student account found for "${cleanEmail}". Click "Create Account with Google" to register now.` 
    };
  }

  try {
    await registerDeviceSession(existing, true);
    return { success: true, user: existing };
  } catch (err) {
    return { success: true, user: existing };
  }
}
