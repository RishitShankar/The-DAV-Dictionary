import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://trafnmjbnlcexxzcbzqg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyYWZubWpibmxjZXh4emNienFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNzY1MjksImV4cCI6MjEwNzg1MjUyOX0.o-3LhqKnymn87nU1qd7s-wVLCyyntuMD7lb8xkdP7kE';

let cachedClient = null;

/**
 * Returns the active Supabase client instance.
 * Automatically connects to live Supabase Cloud Database across all devices,
 * localhost, and Vercel production deployment.
 */
export function getSupabaseClient() {
  if (cachedClient) return cachedClient;

  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('dav_supabase_url') || DEFAULT_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('dav_supabase_anon_key') || DEFAULT_SUPABASE_ANON_KEY;

  if (!url || !anonKey || !url.startsWith('http')) {
    return null;
  }

  try {
    cachedClient = createClient(url, anonKey);
    return cachedClient;
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

/**
 * Fetch all verified donations from Supabase cloud
 */
export async function fetchCloudDonations() {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('dav_donations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetchCloudDonations notice:', error.message);
      return null;
    }
    return (data || []).map(row => ({
      invoiceNumber: row.invoice_number,
      userId: row.user_id,
      studentName: row.student_name,
      baseAmount: row.base_amount || 0,
      donationAmount: row.donation_amount || 0,
      totalAmount: row.total_amount || 0,
      paymentMode: row.payment_mode || 'Instant UPI',
      note: row.note || '',
      transactionId: row.transaction_id || `TXN-${row.invoice_number}`,
      date: row.created_at ? new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'
    }));
  } catch (e) {
    console.error('fetchCloudDonations failed:', e);
    return null;
  }
}

/**
 * Save a verified donation to Supabase Cloud
 */
export async function saveCloudDonation(donation) {
  const client = getSupabaseClient();
  if (!client || !donation) return false;
  try {
    const row = {
      invoice_number: donation.invoiceNumber,
      user_id: donation.userId || donation.studentId || 'anonymous_donor',
      student_name: donation.studentName || donation.donorName || 'Generous Donor',
      base_amount: parseFloat(donation.baseAmount || 0),
      donation_amount: parseFloat(donation.donationAmount || 0),
      total_amount: parseFloat(donation.totalAmount || 0),
      payment_mode: donation.paymentMode || 'Instant UPI',
      note: donation.note || '',
      transaction_id: donation.transactionId || `TXN-${Date.now().toString().slice(-8)}`,
      created_at: new Date().toISOString()
    };
    const { error } = await client.from('dav_donations').upsert(row, { onConflict: 'invoice_number' });
    if (error) {
      console.warn('saveCloudDonation error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('saveCloudDonation exception:', e);
    return false;
  }
}

export async function deleteCloudDonation(invoiceNumber) {
  const client = getSupabaseClient();
  if (!client || !invoiceNumber) return false;
  try {
    const { error } = await client
      .from('dav_donations')
      .delete()
      .eq('invoice_number', invoiceNumber);
    if (error) {
      console.warn('deleteCloudDonation error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('deleteCloudDonation exception:', e);
    return false;
  }
}

export const FACULTY_DOUBT_VAULT_UUID = '00000000-0000-0000-0000-000000000001';

/**
 * Save doubt chats to Supabase cloud
 */
export async function saveCloudDoubtChats(chats) {
  const client = getSupabaseClient();
  if (!client || !chats) return false;
  try {
    const row = {
      id: FACULTY_DOUBT_VAULT_UUID,
      user_id: 'global_faculty_doubt_desk',
      book_title: 'FACULTY_DOUBT_CHATS_STORE',
      page_number: 1,
      canvas_data: JSON.stringify(chats),
      notes: [],
      updated_at: new Date().toISOString()
    };
    const { error } = await client.from('dav_pdf_annotations').upsert(row, { onConflict: 'id' });
    if (error) {
      console.warn('saveCloudDoubtChats error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('saveCloudDoubtChats exception:', e);
    return false;
  }
}

/**
 * Fetch doubt chats from Supabase cloud
 */
export async function fetchCloudDoubtChats() {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('dav_pdf_annotations')
      .select('canvas_data, updated_at')
      .eq('id', FACULTY_DOUBT_VAULT_UUID)
      .maybeSingle();
    if (error || !data?.canvas_data) return null;
    return JSON.parse(data.canvas_data);
  } catch (e) {
    return null;
  }
}

/**
 * Real-time subscription to doubt chats across multiple phones & browsers
 */
export function subscribeCloudDoubtChats(onUpdate) {
  const client = getSupabaseClient();
  if (!client || !onUpdate) return () => {};
  try {
    const channel = client
      .channel('public:dav_faculty_doubt_chats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dav_pdf_annotations',
          filter: `id=eq.${FACULTY_DOUBT_VAULT_UUID}`
        },
        (payload) => {
          if (payload.new && payload.new.canvas_data) {
            try {
              const parsed = JSON.parse(payload.new.canvas_data);
              onUpdate(parsed);
            } catch (err) {}
          }
        }
      )
      .subscribe();

    return () => {
      try {
        client.removeChannel(channel);
      } catch (err) {}
    };
  } catch (err) {
    return () => {};
  }
}



export const LIVE_BROADCASTS_VAULT_UUID = '00000000-0000-0000-0000-000000000002';

/**
 * Save active live broadcasts to Supabase cloud across PC & Mobile
 */
export async function saveCloudLiveBroadcasts(broadcasts) {
  const client = getSupabaseClient();
  if (!client || !broadcasts) return false;
  try {
    const row = {
      id: LIVE_BROADCASTS_VAULT_UUID,
      user_id: 'global_live_broadcasts_hub',
      book_title: 'LIVE_BROADCASTS_STORE',
      page_number: 1,
      canvas_data: JSON.stringify(broadcasts),
      notes: [],
      updated_at: new Date().toISOString()
    };
    const { error } = await client.from('dav_pdf_annotations').upsert(row, { onConflict: 'id' });
    if (error) {
      console.warn('saveCloudLiveBroadcasts error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('saveCloudLiveBroadcasts exception:', e);
    return false;
  }
}

/**
 * Fetch active live broadcasts from Supabase cloud
 */
export async function fetchCloudLiveBroadcasts() {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('dav_pdf_annotations')
      .select('canvas_data, updated_at')
      .eq('id', LIVE_BROADCASTS_VAULT_UUID)
      .maybeSingle();
    if (error || !data?.canvas_data) return null;
    return JSON.parse(data.canvas_data);
  } catch (e) {
    return null;
  }
}

/**
 * Real-time subscription to live broadcasts across all devices
 */
export function subscribeCloudLiveBroadcasts(onUpdate) {
  const client = getSupabaseClient();
  if (!client || !onUpdate) return () => {};
  try {
    const channel = client
      .channel('public:dav_live_broadcasts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dav_pdf_annotations',
          filter: `id=eq.${LIVE_BROADCASTS_VAULT_UUID}`
        },
        (payload) => {
          if (payload.new && payload.new.canvas_data) {
            try {
              const parsed = JSON.parse(payload.new.canvas_data);
              onUpdate(parsed);
            } catch (err) {}
          }
        }
      )
      .subscribe();

    return () => {
      try {
        client.removeChannel(channel);
      } catch (err) {}
    };
  } catch (err) {
    return () => {};
  }
}


// =========================================================================
// REAL-TIME 1-ON-1 VIDEO CALL SIGNALING (SUPABASE REALTIME BROADCAST + CROSS-TAB)
// =========================================================================
let callSignalingChannelInstance = null;

export function getCallSignalingChannel() {
  const client = getSupabaseClient();
  if (!client) return null;
  if (!callSignalingChannelInstance) {
    try {
      callSignalingChannelInstance = client.channel('dav_whatsapp_video_calls', {
        config: { broadcast: { ack: false } }
      });
      callSignalingChannelInstance.subscribe();
    } catch (e) {
      console.warn('Call signaling channel init error:', e);
    }
  }
  return callSignalingChannelInstance;
}

export function broadcastCallSignal(signalData) {
  const payload = { ...signalData, timestamp: Date.now() };
  try {
    const ch = getCallSignalingChannel();
    if (ch) {
      ch.send({
        type: 'broadcast',
        event: 'call_signal',
        payload
      }).catch(() => {});
    }
  } catch (e) {}

  // Cross-tab storage fallback for local browser testing
  try {
    localStorage.setItem('dav_active_call_signal_event', JSON.stringify(payload));
  } catch (e) {}
}

export function subscribeCallSignals(onSignal) {
  if (typeof onSignal !== 'function') return () => {};

  const ch = getCallSignalingChannel();
  if (ch) {
    ch.on('broadcast', { event: 'call_signal' }, ({ payload }) => {
      if (payload) onSignal(payload);
    });
  }

  // Same-browser cross-tab listener
  const handleStorage = (e) => {
    if (e.key === 'dav_active_call_signal_event' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        onSignal(parsed);
      } catch (err) {}
    }
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('storage', handleStorage);
  };
}
