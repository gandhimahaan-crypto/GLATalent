import { create } from 'zustand'

const roleUsers = {
  student: { name: 'Student', role: 'student', email: '' },
  faculty: { name: 'Prof. Meera Sinha', role: 'faculty', email: 'meera.sinha@gla.ac.in' },
  admin: { name: 'Placement Admin', role: 'admin', email: 'admin@gla.ac.in' },
}

function getNameFromEmail(email) {
  const trimmedEmail = email.trim()
  const [username] = trimmedEmail.split('@')
  return username || roleUsers.student.name
}

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (role, email = '') => set({
    isAuthenticated: true,
    user: role === 'student'
      ? { ...roleUsers.student, name: getNameFromEmail(email), email: email.trim() }
      : roleUsers[role],
  }),
  logout: () => set({ isAuthenticated: false, user: null }),
}))
