import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { saveCloudStudent } from './supabaseClient';
import { safeSetUser } from '../utils/safeStorage';

const PURCHASES_STORAGE_KEY = 'dav_pending_purchases';

// Initial preloaded sample purchase to showcase the interface cleanly if first time
const SAMPLE_PURCHASES = [
  {
    id: 'PUR-2026-8911',
    studentId: 'DAV-2026-4421',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma.dav@gmail.com',
    studentPhoto: null,
    plan: 'vip',
    planName: 'Dimension 2: VIP Plan',
    amount: 299,
    paymentMethod: 'UPI / Paytm',
    referenceNote: 'UPI Ref: 42918820192',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    formattedDate: 'Today at 02:15 PM',
    verifiedAt: null
  }
];

/**
 * Retrieve all purchase verification requests
 */
export function getPurchases() {
  try {
    const raw = localStorage.getItem(PURCHASES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to read purchases:', e);
  }
  // Initialize with sample
  localStorage.setItem(PURCHASES_STORAGE_KEY, JSON.stringify(SAMPLE_PURCHASES));
  return SAMPLE_PURCHASES;
}

/**
 * Save purchases list to localStorage
 */
export function savePurchases(purchases) {
  try {
    localStorage.setItem(PURCHASES_STORAGE_KEY, JSON.stringify(purchases));
    window.dispatchEvent(new CustomEvent('dav_purchases_updated', { detail: purchases }));
  } catch (e) {
    console.error('Failed to save purchases:', e);
  }
}

/**
 * Submit a student's subscription purchase request with custom amount (₹0 to ₹1,00,000)
 */
export function submitPurchaseRequest({
  studentId,
  studentName,
  studentEmail,
  studentPhoto = null,
  plan = 'normal',
  planName = 'Dimension 2: Normal Plan',
  amount = 99,
  paymentMethod = 'Online (Paytm QR)',
  referenceNote = '',
  profileDetails = {}
}) {
  const current = getPurchases();

  // Spam Prevention: Maximum 3 pending verification requests allowed per student!
  const pendingCount = current.filter(p => 
    p.status === 'pending' && 
    ((studentId && p.studentId === studentId) || (studentEmail && p.studentEmail === studentEmail))
  ).length;

  if (pendingCount >= 3) {
    return {
      success: false,
      error: 'You already have 3 pending verification requests. Please wait for Administrator Rishit Shankar to review them.'
    };
  }
  const numericAmount = Math.min(100000, Math.max(0, Number(amount) || 0));

  const newPurchase = {
    id: `PUR-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    studentId: studentId || `DAV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName: studentName || 'DAV Scholar',
    studentEmail: studentEmail || 'student@gmail.com',
    studentPhoto: studentPhoto || null,
    plan: plan, // 'normal' (dim 2) | 'vip' (dim 3) | 'vvip' (dim 4) | 'teacher' (dim 6)
    planName: planName,
    amount: numericAmount,
    paymentMethod: paymentMethod, // 'Cash' | 'Online (Paytm QR)'
    referenceNote: referenceNote.trim(),
    profileDetails: profileDetails || {},
    status: 'pending', // 'pending' | 'verified' | 'rejected'
    createdAt: new Date().toISOString(),
    formattedDate: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    verifiedAt: null
  };

  const updated = [newPurchase, ...current];
  savePurchases(updated);

  window.dispatchEvent(new CustomEvent('dav_purchase_submitted', { detail: newPurchase }));
  return { success: true, purchase: newPurchase };
}

/**
 * Admin Action: Verify and approve student purchase.
 * Ends their trial/demo restrictions and automatically grants the chosen subscription plan!
 */
export async function verifyAndApprovePurchase(purchaseId, adminName = 'Rishit Shankar (Head Boy & Admin)') {
  const purchases = getPurchases();
  const purchase = purchases.find(p => p.id === purchaseId);
  if (!purchase) return { success: false, error: 'Purchase request not found' };

  // 1. Update purchase status
  const updatedPurchases = purchases.map(p => {
    if (p.id === purchaseId) {
      return {
        ...p,
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        verifiedBy: adminName
      };
    }
    return p;
  });
  savePurchases(updatedPurchases);

  // 2. Resolve Plan Parameters (6-Dimension Concept)
  // Dimension 1: Free (Unpaid / Demo)
  // Dimension 2: Normal (Normal Plan)
  // Dimension 3: VIP (VIP Plan)
  // Dimension 4: VVIP (Double VIP Plan)
  // Dimension 5: Developer (Master Dev Rishit Shankar)
  // Dimension 6: Teacher (Faculty OS)
  const targetPlan = (purchase.plan || 'normal').toLowerCase();
  const targetDimension = 
    targetPlan === 'teacher' ? 6 :
    targetPlan === 'developer' ? 5 :
    targetPlan === 'vvip' ? 4 :
    targetPlan === 'vip' ? 3 :
    targetPlan === 'normal' ? 2 : 1;

  const targetDimensionName = 
    targetPlan === 'teacher' ? 'Dimension 6: Teacher' :
    targetPlan === 'developer' ? 'Dimension 5: Developer' :
    targetPlan === 'vvip' ? 'Dimension 4: VVIP' :
    targetPlan === 'vip' ? 'Dimension 3: VIP' :
    targetPlan === 'normal' ? 'Dimension 2: Normal' :
    'Dimension 1: Free';

  // 3. Update student in registered users
  const registered = getRegisteredUsers();
  let studentUpdated = false;
  let targetUserObj = null;

  const updatedUsers = registered.map(user => {
    const isTarget = 
      (user.id && purchase.studentId && user.id.toLowerCase() === purchase.studentId.toLowerCase()) ||
      (user.email && purchase.studentEmail && user.email.toLowerCase() === purchase.studentEmail.toLowerCase());

    if (isTarget) {
      studentUpdated = true;
      targetUserObj = {
        ...user,
        plan: targetPlan,
        dimension: targetDimension,
        dimensionName: targetDimensionName,
        isPaid: true,
        paidAmount: `₹${purchase.amount}`,
        trialEnded: true,
        subscriptionStatus: 'active',
        verifiedByAdmin: adminName,
        verifiedAt: new Date().toISOString()
      };
      return targetUserObj;
    }
    return user;
  });

  if (studentUpdated) {
    saveRegisteredUsers(updatedUsers);
    if (targetUserObj) {
      saveCloudStudent(targetUserObj).catch(() => {});
    }
  }

  // 4. If current logged-in user matches this student, refresh their session live!
  try {
    const rawUser = localStorage.getItem('dav_user');
    if (rawUser) {
      const currentUser = JSON.parse(rawUser);
      const isCurrentStudent = 
        (currentUser.id && purchase.studentId && currentUser.id.toLowerCase() === purchase.studentId.toLowerCase()) ||
        (currentUser.email && purchase.studentEmail && currentUser.email.toLowerCase() === purchase.studentEmail.toLowerCase());

      if (isCurrentStudent) {
        const refreshedUser = {
          ...currentUser,
          plan: targetPlan,
          dimension: targetDimension,
          dimensionName: targetDimensionName,
          isPaid: true,
          paidAmount: `₹${purchase.amount}`,
          trialEnded: true,
          subscriptionStatus: 'active'
        };
        safeSetUser(refreshedUser);
        window.dispatchEvent(new CustomEvent('dav_user_plan_updated', { detail: refreshedUser }));
      }
    }
  } catch (e) {
    console.warn('Error refreshing active student session:', e);
  }

  return { success: true, purchase };
}

/**
 * Admin Action: Reject purchase request
 */
export function rejectPurchase(purchaseId) {
  const purchases = getPurchases();
  const updated = purchases.map(p => {
    if (p.id === purchaseId) {
      return { ...p, status: 'rejected' };
    }
    return p;
  });
  savePurchases(updated);
  return { success: true };
}

/**
 * Admin Action: Delete purchase record
 */
export function deletePurchase(purchaseId) {
  const purchases = getPurchases();
  const updated = purchases.filter(p => p.id !== purchaseId);
  savePurchases(updated);
  return { success: true };
}
