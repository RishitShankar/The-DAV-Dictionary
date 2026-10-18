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
    // Ping a standard system health query
    const { data, error } = await testClient.from('dav_students').select('*').limit(1);
    if (error && error.code !== 'PGRST116' && !error.message?.includes('relation "dav_students" does not exist')) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Connected successfully to Supabase!' };
  } catch (err) {
    return { success: false, message: err.message || 'Connection failed' };
  }
}

/**
 * Sync local registered users to Supabase if connected
 */
export async function syncUsersToSupabase(users) {
  const client = getSupabaseClient();
  if (!client || !users || users.length === 0) return false;

  try {
    const formatted = users.map(u => ({
      id: u.id,
      admission_number: u.admissionNumber,
      full_name: u.fullName,
      class: u.class,
      section: u.section,
      phone: u.phone,
      plan: u.plan,
      is_paid: u.isPaid,
      fee_amount: u.feeAmount,
      created_at: u.createdAt || new Date().toISOString()
    }));

    const { error } = await client
      .from('dav_students')
      .upsert(formatted, { onConflict: 'admission_number' });

    if (error) {
      console.warn('Supabase upsert warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error syncing to Supabase:', err);
    return false;
  }
}
