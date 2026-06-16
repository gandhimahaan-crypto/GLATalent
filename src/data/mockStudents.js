export const students = [
  {
    id: 'stu-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gla.ac.in',
    rollNo: 'GLA22CS001',
    branch: 'CSE',
    section: 'CS-A',
    batch: 2026,
    cgpa: 8.2,
    attendance: 86,
    readiness: 68,
    domain: 'Software Development',
    risk: 'Medium',
    status: 'Active',
    profileComplete: 24,
    packageRange: '4.2L - 7.8L',
    placeProbability: 73,
    birthplace: 'Mathura',
    parentOccupations: 'Teacher, Business owner',
    skills: ['JavaScript', 'React', 'DSA', 'SQL', 'Git'],
    certifications: ['AWS Cloud Practitioner', 'Meta Front-End Basics'],
    courses: ['System Design Basics', 'Advanced DSA'],
    projects: ['Campus Placement Tracker', 'React Analytics Dashboard'],
    digital: { github: 'aaravdev', leetcode: 'aarav_codes', linkedin: 'aarav-sharma', hackerrank: 'aarav_hr' },
    semesterMarks: [
      { sem: 1, English: 78, Aptitude: 82, DSA: 74, Immersion: 80 },
      { sem: 2, English: 81, Aptitude: 88, DSA: 90, Immersion: 86 },
      { sem: 3, English: 84, Aptitude: 85, DSA: 87, Immersion: 82 },
      { sem: 4, English: 80, Aptitude: 89, DSA: 91, Immersion: 84 },
    ],
  },
  { id: 'stu-002', name: 'Priya Verma', email: 'priya.verma@gla.ac.in', rollNo: 'GLA22CS014', branch: 'CSE', section: 'CS-A', batch: 2026, cgpa: 9.1, attendance: 92, readiness: 84, domain: 'Data Science', risk: 'Low', status: 'Active', profileComplete: 88 },
  { id: 'stu-003', name: 'Kabir Khan', email: 'kabir.khan@gla.ac.in', rollNo: 'GLA22CS021', branch: 'CSE', section: 'CS-A', batch: 2026, cgpa: 6.7, attendance: 61, readiness: 36, domain: 'Cloud', risk: 'High', status: 'At-Risk', profileComplete: 52 },
  { id: 'stu-004', name: 'Nisha Gupta', email: 'nisha.gupta@gla.ac.in', rollNo: 'GLA22CS033', branch: 'CSE', section: 'CS-A', batch: 2026, cgpa: 7.8, attendance: 78, readiness: 59, domain: 'Cybersecurity', risk: 'Medium', status: 'Active', profileComplete: 74 },
  { id: 'stu-005', name: 'Rohan Mehta', email: 'rohan.mehta@gla.ac.in', rollNo: 'GLA22CS047', branch: 'CSE', section: 'CS-A', batch: 2026, cgpa: 8.6, attendance: 89, readiness: 76, domain: 'AI/ML', risk: 'Low', status: 'Placed', profileComplete: 94 },
  { id: 'stu-006', name: 'Simran Kaur', email: 'simran.kaur@gla.ac.in', rollNo: 'GLA22CS052', branch: 'CSE', section: 'CS-A', batch: 2026, cgpa: 7.1, attendance: 69, readiness: 44, domain: 'Consulting', risk: 'High', status: 'At-Risk', profileComplete: 46 },
]

export const profile = students[0]

export const facultyStudents = students.filter((student) => student.section === 'CS-A')

export const departmentRows = [
  { department: 'CSE', students: 362, cgpa: 7.8, readiness: 68, place: 74 },
  { department: 'ECE', students: 186, cgpa: 7.3, readiness: 61, place: 66 },
  { department: 'ME', students: 122, cgpa: 7.1, readiness: 58, place: 59 },
  { department: 'MBA', students: 177, cgpa: 7.6, readiness: 64, place: 69 },
]
