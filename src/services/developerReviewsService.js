import { getSupabaseClient } from './supabaseClient';

const DEVELOPER_REVIEWS_STORAGE_KEY = 'dav_developer_reviews';
const DEVELOPER_REVIEWS_VAULT_UUID = '00000000-0000-0000-0000-000000000012';

// Seed demo reviews so the developer can see Section 12 working immediately
const DEFAULT_REVIEWS = [
  {
    id: 'rev_1719200001',
    studentName: 'Saharsh Shankar',
    studentId: 'saharsh_vvip',
    classNum: '8-D',
    reviewText: 'The DAV Dictionary and Smart Portal created by Rishit Shankar is absolutely revolutionary. Having our entire DAV curriculum, chapter-wise questions, and Rishi AI integrated in one single application makes revision effortless. Super proud of my brother Rishit!',
    wordCount: 36,
    rating: 5,
    voiceAudioUrl: null,
    voiceAudioName: null,
    videoUrl: null,
    videoName: null,
    attachments: [],
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    readByDeveloper: false
  },
  {
    id: 'rev_1719200002',
    studentName: 'Ananya Patel',
    studentId: 'dav802',
    classNum: '8-A',
    reviewText: 'The textbook reading mode and Sanskrit shloka explanations helped me score 95+ in unit tests. Highly recommend every DAV student to bookmark this portal on their phone.',
    wordCount: 26,
    rating: null, // "nothing" given for stars
    voiceAudioUrl: null,
    voiceAudioName: null,
    videoUrl: null,
    videoName: null,
    attachments: [],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    readByDeveloper: false
  },
  {
    id: 'rev_1719200003',
    studentName: 'Aarav Kumar Sharma',
    studentId: 'dav805',
    classNum: '8-C',
    reviewText: 'Awesome work Rishit bhaiya! Section 8 Study Leaderboard and Section 4 Rishi AI give instant answers whenever I have doubts in Science & Mathematics late at night. Looking forward to the DAV Hindi book updates.',
    wordCount: 34,
    rating: 5,
    voiceAudioUrl: null,
    voiceAudioName: null,
    videoUrl: null,
    videoName: null,
    attachments: [],
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    readByDeveloper: false
  }
];

/**
 * Fetch all submitted reviews (from Supabase Cloud or LocalStorage fallback)
 */
export async function getDeveloperReviews() {
  let localReviews = [];
  try {
    const raw = localStorage.getItem(DEVELOPER_REVIEWS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localReviews = parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading local reviews:', e);
  }

  // If local is completely empty, initialize with default seed reviews
  if (localReviews.length === 0) {
    localReviews = [...DEFAULT_REVIEWS];
    try {
      localStorage.setItem(DEVELOPER_REVIEWS_STORAGE_KEY, JSON.stringify(localReviews));
    } catch (e) {}
  }

  // Try fetching from Supabase Cloud
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('dav_pdf_annotations')
        .select('canvas_data, updated_at')
        .eq('id', DEVELOPER_REVIEWS_VAULT_UUID)
        .maybeSingle();

      if (!error && data?.canvas_data) {
        const cloudReviews = JSON.parse(data.canvas_data);
        if (Array.isArray(cloudReviews) && cloudReviews.length > 0) {
          // Merge local and cloud reviews by unique ID
          const map = new Map();
          cloudReviews.forEach(r => map.set(r.id, r));
          localReviews.forEach(r => map.set(r.id, r));
          const merged = Array.from(map.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          try {
            localStorage.setItem(DEVELOPER_REVIEWS_STORAGE_KEY, JSON.stringify(merged));
          } catch (e) {}
          return merged;
        }
      }
    } catch (err) {
      console.warn('Supabase getDeveloperReviews exception:', err);
    }
  }

  return localReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Submit a new review to Supabase and LocalStorage
 */
export async function submitDeveloperReview(newReview) {
  const reviews = await getDeveloperReviews();
  const updatedReviews = [newReview, ...reviews.filter(r => r.id !== newReview.id)];

  // 1. Save to LocalStorage immediately
  try {
    localStorage.setItem(DEVELOPER_REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
  } catch (e) {
    console.warn('Failed saving reviews to localStorage:', e);
  }

  // 2. Sync to Supabase Cloud
  const client = getSupabaseClient();
  if (client) {
    try {
      const row = {
        id: DEVELOPER_REVIEWS_VAULT_UUID,
        user_id: 'rishit_developer_vault',
        book_title: 'DEVELOPER_REVIEWS_STORE',
        page_number: 1,
        canvas_data: JSON.stringify(updatedReviews),
        notes: [],
        updated_at: new Date().toISOString()
      };
      await client.from('dav_pdf_annotations').upsert(row, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase submitDeveloperReview error:', err);
    }
  }

  // Trigger storage event for live reactive update
  window.dispatchEvent(new Event('dav_developer_reviews_updated'));
  return updatedReviews;
}

/**
 * Delete a review (Developer only)
 */
export async function deleteDeveloperReview(reviewId) {
  const reviews = await getDeveloperReviews();
  const updatedReviews = reviews.filter(r => r.id !== reviewId);

  try {
    localStorage.setItem(DEVELOPER_REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
  } catch (e) {}

  const client = getSupabaseClient();
  if (client) {
    try {
      const row = {
        id: DEVELOPER_REVIEWS_VAULT_UUID,
        user_id: 'rishit_developer_vault',
        book_title: 'DEVELOPER_REVIEWS_STORE',
        page_number: 1,
        canvas_data: JSON.stringify(updatedReviews),
        notes: [],
        updated_at: new Date().toISOString()
      };
      await client.from('dav_pdf_annotations').upsert(row, { onConflict: 'id' });
    } catch (err) {}
  }

  window.dispatchEvent(new Event('dav_developer_reviews_updated'));
  return updatedReviews;
}
