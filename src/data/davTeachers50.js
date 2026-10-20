import { getRegisteredUsers } from './preloadedUsers';

// Zero fake demo faculty: completely clean real registered directory
export const BASE_DAV_FACULTY = [];

export const DAV_50_TEACHERS = [];

/**
 * Dynamically retrieves all active teachers:
 * Merges registered Dimension 5 teacher accounts, custom-created faculty profiles,
 * and current logged-in teacher into a clean, verified list.
 * Demo mock lists are completely removed.
 */
export function getAllTeachers(currentUser = null) {
  let registeredUsers = [];
  try {
    registeredUsers = getRegisteredUsers() || [];
  } catch (e) {
    registeredUsers = [];
  }

  // Retrieve custom faculty created directly in portal
  let customFaculty = [];
  try {
    const raw = localStorage.getItem('dav_custom_teachers_v2');
    if (raw) {
      customFaculty = JSON.parse(raw);
    }
  } catch (e) {
    customFaculty = [];
  }

  // Filter registered users for teacher accounts (Dimension 5)
  const teacherUsers = registeredUsers.filter(u => 
    Boolean(
      u.dimension === 5 ||
      u.plan === 'teacher' ||
      u.isTeacher ||
      (u.role && u.role.toLowerCase().includes('teacher')) ||
      (u.dimensionName && u.dimensionName.toLowerCase().includes('faculty'))
    )
  );

  // If currentUser is a teacher, ensure they are in the list
  if (currentUser && Boolean(
    currentUser.dimension === 5 ||
    currentUser.plan === 'teacher' ||
    currentUser.isTeacher ||
    (currentUser.role && currentUser.role.toLowerCase().includes('teacher')) ||
    (currentUser.dimensionName && currentUser.dimensionName.toLowerCase().includes('faculty'))
  )) {
    const exists = teacherUsers.some(u => 
      (u.id && currentUser.id && u.id.toLowerCase() === currentUser.id.toLowerCase()) ||
      (u.name && currentUser.name && u.name.toLowerCase() === currentUser.name.toLowerCase())
    );
    if (!exists) {
      teacherUsers.unshift(currentUser);
    }
  }

  // Map registered teacher users to unified faculty model
  const registeredFaculty = teacherUsers.map((u, idx) => {
    const rawName = u.name || u.id || ('Faculty Member ' + (idx + 1));
    const cleanName = (
      rawName.startsWith('Mr.') ||
      rawName.startsWith('Mrs.') ||
      rawName.startsWith('Ms.') ||
      rawName.startsWith('Dr.') ||
      rawName.startsWith('Prof.')
    ) ? rawName : ('Prof. ' + rawName);

    const subj = u.subject || u.department || 'Science & Technology';
    const dept = u.department || (
      subj.toLowerCase().includes('scien') || subj.toLowerCase().includes('bio') ? 'Science' :
      subj.toLowerCase().includes('math') ? 'Mathematics' :
      subj.toLowerCase().includes('sanskrit') ? 'Sanskrit' :
      subj.toLowerCase().includes('hindi') ? 'Hindi' :
      subj.toLowerCase().includes('eng') ? 'English' :
      subj.toLowerCase().includes('social') || subj.toLowerCase().includes('hist') || subj.toLowerCase().includes('sst') ? 'Social Science' :
      subj.toLowerCase().includes('comp') || subj.toLowerCase().includes('ict') ? 'Computer Science' :
      'Science'
    );

    return {
      id: u.id && u.id.startsWith('tch_') ? u.id : ('tch_reg_' + (u.id || idx)),
      originalId: u.id,
      name: cleanName,
      subject: subj,
      department: dept,
      role: u.role || 'DAV Faculty Teacher (Dimension 5)',
      qualification: u.qualification || 'M.Sc./M.A., B.Ed., CTET Certified',
      status: 'Online',
      assignedClass: 'Class ' + (u.classNum || '8') + '-' + (u.section || 'D'),
      avatarColor: u.avatarColor || (idx % 2 === 0 ? 'from-purple-600 to-indigo-700' : 'from-teal-500 to-emerald-700'),
      dp: u.dp || u.avatar || u.photoUrl || null,
      contactNumber: u.phoneNumber || '919470033984',
      initialMessage: 'Greetings! I am ' + cleanName + '. How can I assist you with your academic questions and homework doubts today?',
      isRegisteredFaculty: true,
      registeredUser: u
    };
  });

  // Merge custom faculty profiles
  const mergedList = [...registeredFaculty];
  customFaculty.forEach(cf => {
    if (!mergedList.some(m => m.id === cf.id || m.name.toLowerCase() === cf.name.toLowerCase())) {
      mergedList.push({
        ...cf,
        isRegisteredFaculty: true
      });
    }
  });

  return mergedList;
}

export default getAllTeachers;
