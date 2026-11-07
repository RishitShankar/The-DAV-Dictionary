// Pre-configured Verified Database Accounts for DAV Dictionary
// Dimension 4: Master Developer & Administrator (Rishit Shankar)
// Dimension 7: Bus Driver (Free account generated strictly by Developer)
// Master password can be overridden via VITE_MASTER_DEVELOPER_PASSWORD environment variable

const MASTER_DEV_PASSWORD = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MASTER_DEVELOPER_PASSWORD) || '123456789@aA';

export const MASTER_DEVELOPER_ACCOUNT = {
  id: 'rishibhai',
  password: MASTER_DEV_PASSWORD,
  name: 'Rishit Shankar',
  role: 'Administrator & Developer',
  classNum: '8',
  plan: 'developer',
  dimension: 4,
  dimensionName: 'Dimension 4: Master Developer',
  paidAmount: 'Founder / Unlimited',
  paymentMode: 'System Authority',
  isAdmin: true,
  createdAt: 'System Root',
  photoUrl: '/rishit_shankar.jpg',
  photoURL: '/rishit_shankar.jpg',
  avatar: '/rishit_shankar.jpg',
  dp: '/rishit_shankar.jpg'
};

export const DEFAULT_TEACHER_ACCOUNT = null;

// Official Dimension 7 Bus Driver Default Pilot Account
export const DEFAULT_BUS_DRIVER_ACCOUNT = {
  id: 'driver1',
  password: '123',
  name: 'Shri Rajesh Kumar Singh',
  role: 'School Bus Driver',
  busNumber: 1,
  busCode: 'BUS-01',
  route: 'Ramdayalu ➔ Aghoria Bazar ➔ Mithanpura ➔ DAV Khabra',
  mobileNumber: '9431012345',
  plan: 'bus_driver',
  dimension: 7,
  dimensionName: 'Dimension 7: Bus Driver',
  isDriver: true,
  createdAt: '2026-11-07',
  assignedSection: 7
};

export const PRELOADED_DATABASE_USERS = [
  MASTER_DEVELOPER_ACCOUNT,
  DEFAULT_BUS_DRIVER_ACCOUNT
];

export function isMasterAdminId(id) {
  if (!id) return false;
  const nid = String(id).trim().toLowerCase();
  return (
    nid === 'rishibhai' ||
    nid === 'adm-root-001' ||
    nid === 'rishit' ||
    nid === 'rishit shankar' ||
    nid === 'headboyrishitshankar@gmail.com'
  );
}

export function isMasterPasswordValid(pass) {
  if (!pass) return false;
  const p = String(pass).trim();
  return (
    p === '123456789@aA' ||
    p === '123456789@Aa' ||
    p === '123456789@AA' ||
    p === '123456789@aa' ||
    p === MASTER_DEV_PASSWORD
  );
}

// Helper to initialize or retrieve registered users from database
export function getRegisteredUsers() {
  const raw = localStorage.getItem('dav_registered_users');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let updated = parsed.filter(u => u.name !== 'Mrs. Sunita Sharma' && u.id !== 'teacher1');
        // Unmask any accidental masked passwords for admin or cached users
        updated = updated.map(u => {
          if (isMasterAdminId(u.id) && (u.password === '••••••••' || !u.password)) {
            return { ...u, password: MASTER_DEV_PASSWORD };
          }
          return u;
        });
        // Ensure admin account is always present
        const hasAdmin = updated.some(u => isMasterAdminId(u.id) || u.isAdmin);
        if (!hasAdmin) {
          updated = [MASTER_DEVELOPER_ACCOUNT, ...updated];
        }
        // Ensure default bus driver account is available if not present
        const hasDriver = updated.some(u => u.id === 'driver1' || u.dimension === 7);
        if (!hasDriver) {
          updated = [...updated, DEFAULT_BUS_DRIVER_ACCOUNT];
        }
        if (updated.length !== parsed.length) {
          localStorage.setItem('dav_registered_users', JSON.stringify(updated));
        }
        return updated;
      }
    } catch (e) {
      console.warn('Error reading dav_registered_users:', e);
    }
  }
  // Initialize with master administrator & default driver
  const initial = [MASTER_DEVELOPER_ACCOUNT, DEFAULT_BUS_DRIVER_ACCOUNT];
  try {
    localStorage.setItem('dav_registered_users', JSON.stringify(initial));
  } catch (e) {}
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

// ============================================================================
// DIMENSION 7: BUS DRIVER ACCOUNT MANAGEMENT (DEVELOPER ONLY GENERATION)
// ============================================================================

export function getBusDriverAccounts() {
  const users = getRegisteredUsers();
  return users.filter(u => u.dimension === 7 || u.isDriver || u.plan === 'bus_driver');
}

export function createBusDriverAccount({ busNumber, name, mobileNumber, id, password, route }) {
  const num = Number(busNumber) || 1;
  const busPad = String(num).padStart(2, '0');
  const driverId = (id || `driver_${num}`).trim().toLowerCase();
  const driverPass = password || '123';

  const newDriver = {
    id: driverId,
    password: driverPass,
    name: name || `Shri Driver (Bus ${num})`,
    role: 'School Bus Driver',
    busNumber: num,
    busCode: `Bus No. ${busPad}`,
    route: route || `Khabra Route • Bus ${num}`,
    mobileNumber: mobileNumber || '9431000000',
    phoneNumber: mobileNumber || '9431000000',
    plan: 'bus_driver',
    dimension: 7,
    dimensionName: 'Dimension 7: Bus Driver',
    isDriver: true,
    createdAt: new Date().toISOString().split('T')[0],
    assignedSection: 7,
    isPaid: true
  };

  const users = getRegisteredUsers();
  const existingIdx = users.findIndex(u => u.id.toLowerCase() === driverId);
  if (existingIdx !== -1) {
    users[existingIdx] = newDriver;
  } else {
    users.push(newDriver);
  }
  saveRegisteredUsers(users);

  // Also update fleet state so bus is marked as having a driver
  try {
    const { updateBusInFleet } = require('./busFleet100.js');
    if (updateBusInFleet) {
      updateBusInFleet(num, {
        driverName: newDriver.name,
        driverPhone: newDriver.mobileNumber,
        hasDriverAccount: true,
        driverAccountId: newDriver.id
      });
    }
  } catch (e) {}

  return newDriver;
}

export function deleteBusDriverAccount(driverId) {
  const users = getRegisteredUsers();
  const filtered = users.filter(u => u.id !== driverId);
  saveRegisteredUsers(filtered);
}
