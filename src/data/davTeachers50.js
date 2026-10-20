import { getRegisteredUsers } from './preloadedUsers';

// Base Verified DAV Public School Faculty Members
// Used in Section 5 (Dimension 5: Faculty Direct Desk & Academic Mentorship)

export const BASE_DAV_FACULTY = [
  {
    id: 'tch_01',
    name: 'Mrs. Sunita Sharma',
    subject: 'Science & Biology',
    department: 'Science',
    role: 'Head of Department - Science & Senior Faculty',
    qualification: 'M.Sc. (Botany), B.Ed., CTET Certified',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-A',
    avatarColor: 'from-purple-500 to-indigo-600',
    dp: null,
    contactNumber: '919470033984',
    initialMessage: "Greetings! I am Mrs. Sunita Sharma. How can I help clarify your Science chapter doubts today?"
  },
  {
    id: 'tch_02',
    name: 'Mr. Rajesh Verma',
    subject: 'Mathematics',
    department: 'Mathematics',
    role: 'Senior Faculty - Secondary Mathematics',
    qualification: 'M.Sc. (Maths), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-C',
    avatarColor: 'from-teal-500 to-cyan-600',
    dp: null,
    contactNumber: '919470033984',
    initialMessage: "Hello! Mr. Rajesh Verma here. Which mathematics problem or theorem do you need help with?"
  },
  {
    id: 'tch_03',
    name: 'Mrs. Neha Srivastava',
    subject: 'Social Science',
    department: 'Social Science',
    role: 'Senior Faculty - History & Civics',
    qualification: 'M.A. (History), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-B',
    avatarColor: 'from-rose-500 to-pink-600',
    dp: null,
    contactNumber: '919470033984',
    initialMessage: "Hello students! Feel free to ask any query related to History, Civics, or Geography."
  },
  {
    id: 'tch_04',
    name: 'Mr. Arvind Saxena',
    subject: 'English',
    department: 'English',
    role: 'Senior English Master & Literary Head',
    qualification: 'M.A. (English Lit), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-E',
    avatarColor: 'from-blue-500 to-indigo-600',
    dp: null,
    contactNumber: '919470033984',
    initialMessage: "Welcome! Need assistance with grammar, reading comprehension, or literature essays?"
  },
  {
    id: 'tch_05',
    name: 'Mrs. Rekha Sharma',
    subject: 'Hindi',
    department: 'Hindi',
    role: 'Senior Faculty - Hindi Language & Literature',
    qualification: 'M.A. (Hindi), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-A',
    avatarColor: 'from-amber-500 to-orange-600',
    dp: null,
    contactNumber: '919470033984',
    initialMessage: "Hello! Reach out anytime for help with Hindi grammar rules, essays, and chapter questions."
  },
  {
    id: 'tch_06',
    name: 'Dr. Anand Kumar Mishra',
    subject: 'Sanskrit',
    department: 'Sanskrit',
    role: 'Senior Faculty - Sanskrit & Indian Culture',
    qualification: 'Ph.D. Sanskrit, M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-B',
    avatarColor: 'from-amber-600 to-yellow-600',
    dp: null,
    contactNumber: '919470033984',
    initialMessage: "Greetings! I am here to assist you with Sanskrit grammar, shlokas, and textbook exercises."
  },
  {
    id: 'tch_07',
    name: 'Mr. Deepak Chopra',
    subject: 'Computer Science',
    department: 'Computer Science',
    role: 'ICT Head & Computer Science Faculty',
    qualification: 'MCA, B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-C',
    avatarColor: 'from-cyan-500 to-blue-600',
    dp: null,
    contactNumber: '919470033984',
    initialMessage: "Hello! Have any doubts on Python coding, computer hardware, or HTML/Web projects?"
  }
];

export const DAV_50_TEACHERS = BASE_DAV_FACULTY;

/**
 * Dynamically retrieves all active teachers:
 * Merges registered Dimension 5 teacher accounts, custom-created faculty profiles,
 * and current logged-in teacher into a clean, verified list.
 * Demo mock lists of 50 names are completely removed.
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
    const raw = localStorage.getItem('dav_custom_teachers_v1');
    if (raw) {
      customFaculty = JSON.parse(raw);
    }
  } catch (e) {
    customFaculty = [];
  }

  // Filter registered users for teacher accounts
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
    const rawName = u.name || u.id || `Faculty Member ${idx + 1}`;
    const cleanName = (
      rawName.startsWith('Mr.') ||
      rawName.startsWith('Mrs.') ||
      rawName.startsWith('Ms.') ||
      rawName.startsWith('Dr.') ||
      rawName.startsWith('Prof.')
    ) ? rawName : `Prof. ${rawName}`;

    const subj = u.subject || u.department || 'Science & Biology';
    const dept = u.department || (
      subj.toLowerCase().includes('scien') || subj.toLowerCase().includes('bio') ? 'Science' :
      subj.toLowerCase().includes('math') ? 'Mathematics' :
      subj.toLowerCase().includes('sanskrit') ? 'Sanskrit' :
      subj.toLowerCase().includes('hindi') ? 'Hindi' :
      subj.toLowerCase().includes('eng') ? 'English' :
      subj.toLowerCase().includes('social') || subj.toLowerCase().includes('hist') ? 'Social Science' :
      subj.toLowerCase().includes('comp') || subj.toLowerCase().includes('ict') ? 'Computer Science' :
      'Science'
    );

    return {
      id: u.id && u.id.startsWith('tch_') ? u.id : `tch_reg_${u.id || idx}`,
      originalId: u.id,
      name: cleanName,
      subject: subj,
      department: dept,
      role: u.role || 'DAV Faculty Teacher (Dimension 5)',
      qualification: u.qualification || 'M.Sc./M.A., B.Ed., CTET Certified',
      status: 'Online',
      assignedClass: `Class ${u.classNum || '8'}-${u.section || 'D'}`,
      avatarColor: u.avatarColor || (idx % 2 === 0 ? 'from-purple-600 to-indigo-700' : 'from-teal-500 to-emerald-700'),
      dp: u.dp || u.avatar || u.photoUrl || null,
      contactNumber: u.phoneNumber || '919470033984',
      initialMessage: `Greetings! I am ${cleanName}. How can I assist you with your academic questions and homework doubts today?`,
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

  // If no registered teachers exist, supply the verified subject faculty
  if (mergedList.length === 0) {
    return BASE_DAV_FACULTY;
  }

  // Also append base faculty for any subjects not yet covered by registered teachers
  const coveredDepartments = new Set(mergedList.map(m => m.department));
  BASE_DAV_FACULTY.forEach(base => {
    if (!coveredDepartments.has(base.department) && !mergedList.some(m => m.name.toLowerCase() === base.name.toLowerCase())) {
      mergedList.push(base);
    }
  });

  return mergedList;
}

export default getAllTeachers;
