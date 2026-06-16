import { students } from '../data/mockStudents'
import { api } from './api'

export function getStudents() {
  return import.meta.env.VITE_USE_MOCK === 'true' ? Promise.resolve(students) : api('/students')
}
