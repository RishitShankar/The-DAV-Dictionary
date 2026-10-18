import { createClient } from '@supabase/supabase-js';

/**
 * Returns the active Supabase client instance or null if not configured.
 * Checks import.meta.env first, then falls back to localStorage configured via CloudDbModal.
 */
export function getSupabaseClient() {
  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('dav_supabase_url');
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('dav_supabase_anon_key');

  if (!url || !anonKey || !url.startsWith('http')) {
    return null;
  }

  try {
    return createClient(url, anonKey);
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

/**
 * Test connectivity with Supabase project
 */
export async function testSupabaseConnection(url, anonKey) {
  try {
    const testClient = createClient(url, anonKey);
    // Ping dav_students table
    const { data, error } = await testClient.from('dav_students').select('id').limit(1);
    if (error && error.code !== 'PGRST116' && !error.message?.includes('relation "dav_students" does not exist')) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Connected successfully to Supabase cloud database!' };
  } catch (err) {
    return { success: false, message: err.message || 'Connection failed' };
  }
}

/**
 * Fetch all verified students from Supabase cloud
 */
export async function fetchCloudStudents() {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('dav_students').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetchCloudStudents error:', error.message);
      return null;
    }
    return (data || []).map(row => ({
      id: row.id,
      admissionNumber: row.admission_number,
      name: row.full_name,
      password: row.password,
      role: row.role || 'Student',
      classNum: row.class || '8',
      section: row.section || 'A',
      phone: row.phone || '',
      plan: row.plan || 'normal',
      dimension: row.dimension || 1,
      dimensionName: row.dimension_name || 'Dimension 1: Normal',
      isPaid: row.is_paid,
      paidAmount: row.fee_amount ? `₹${row.fee_amount}` : '₹0',
      createdAt: row.created_at ? new Date(row.created_at).toLocaleDateString('en-IN') : 'Cloud'
    }));
  } catch (e) {
    console.error('fetchCloudStudents failed:', e);
    return null;
  }
}

/**
 * Save or update a single student account to Supabase
 */
export async function saveCloudStudent(student) {
  const client = getSupabaseClient();
  if (!client || !student) return false;
  try {
    const row = {
      id: student.id,
      admission_number: student.admissionNumber || `ADM-${student.id.toUpperCase()}`,
      full_name: student.name || student.fullName || student.id,
      password: student.password,
      role: student.role || 'Student',
      class: String(student.classNum || student.class || '8'),
      section: student.section || 'A',
      phone: student.phone || '',
      plan: student.plan || 'normal',
      dimension: student.dimension || 1,
      dimension_name: student.dimensionName || 'Dimension 1: Normal',
      is_paid: Boolean(student.isPaid),
      fee_amount: parseFloat(String(student.paidAmount || '0').replace(/[^0-9.]/g, '')) || 0,
      updated_at: new Date().toISOString()
    };
    const { error } = await client.from('dav_students').upsert(row, { onConflict: 'id' });
    if (error) {
      console.warn('saveCloudStudent error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('saveCloudStudent exception:', e);
    return false;
  }
}

/**
 * Update password in Supabase cloud database
 */
export async function updateCloudPassword(userId, newPassword) {
  const client = getSupabaseClient();
  if (!client || !userId || !newPassword) return false;
  try {
    const { error } = await client
      .from('dav_students')
      .update({ password: newPassword, updated_at: new Date().toISOString() })
      .eq('id', userId);
    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Delete a student from Supabase
 */
export async function deleteCloudStudent(userId) {
  const client = getSupabaseClient();
  if (!client || !userId) return false;
  try {
    const { error } = await client.from('dav_students').delete().eq('id', userId);
    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Save PDF drawing canvas and text notes to Supabase Cloud
 */
export async function saveCloudPdfAnnotation(userId, bookTitle, pageNumber, canvasData, notes = []) {
  const client = getSupabaseClient();
  if (!client || !bookTitle || !pageNumber) return false;
  try {
    const uid = userId || 'public_student';
    const row = {
      user_id: uid,
      book_title: bookTitle,
      page_number: parseInt(pageNumber, 10),
      canvas_data: canvasData || null,
      notes: notes || [],
      updated_at: new Date().toISOString()
    };
    const { error } = await client
      .from('dav_pdf_annotations')
      .upsert(row, { onConflict: 'user_id,book_title,page_number' });
    if (error) {
      console.warn('saveCloudPdfAnnotation error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('saveCloudPdfAnnotation exception:', e);
    return false;
  }
}

/**
 * Load PDF drawing canvas and text notes from Supabase Cloud
 */
export async function loadCloudPdfAnnotation(userId, bookTitle, pageNumber) {
  const client = getSupabaseClient();
  if (!client || !bookTitle || !pageNumber) return null;
  try {
    const uid = userId || 'public_student';
    const { data, error } = await client
      .from('dav_pdf_annotations')
      .select('canvas_data, notes')
      .eq('user_id', uid)
      .eq('book_title', bookTitle)
      .eq('page_number', parseInt(pageNumber, 10))
      .maybeSingle();
    if (error || !data) return null;
    return data;
  } catch (e) {
    return null;
  }
}
