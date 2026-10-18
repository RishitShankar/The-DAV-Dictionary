// Pre-configured Verified Database Accounts for The DAV Dictionary
// Dimension 4: Master Developer & Administrator (Rishit Shankar)
// Paid students start at 0 until registered by the administrator in the Developer Panel.

export const MASTER_DEVELOPER_ACCOUNT = {
  id: 'rishibhai',
  password: '123456789@aA',
  name: 'Rishit Shankar',
  role: 'Administrator & Developer',
  classNum: '8',
  plan: 'developer',
  dimension: 4,
  dimensionName: 'Dimension 4: Master Developer',
  paidAmount: 'Founder / Unlimited',
  paymentMode: 'System Authority',
  isAdmin: true,
  createdAt: 'System Root'
};

export const PRELOADED_DATABASE_USERS = [
  MASTER_DEVELOPER_ACCOUNT
];

// Helper to initialize or retrieve registered users from database
export function getRegisteredUsers() {
  const raw = localStorage.getItem('dav_registered_users');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure admin account is always present
        const hasAdmin = parsed.some(u => u.id === 'rishibhai' || u.isAdmin);
        if (!hasAdmin) {
          const withAdmin = [MASTER_DEVELOPER_ACCOUNT, ...parsed];
          localStorage.setItem('dav_registered_users', JSON.stringify(withAdmin));
          return withAdmin;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Error reading dav_registered_users:', e);
    }
  }
  // Initialize with only the master administrator (0 paid students initially)
  const initial = [MASTER_DEVELOPER_ACCOUNT];
  try {
    localStorage.setItem('dav_registered_users', JSON.stringify(initial));
  } catch (err) {}
  return initial;
}

// Helper to save users permanently to localStorage
export function saveRegisteredUsers(users) {
  try {
    localStorage.setItem('dav_registered_users', JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save registered users to localStorage:', err);
  }
}
