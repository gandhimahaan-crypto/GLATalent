import { create } from 'zustand'
import { profile } from '../data/mockStudents'
import { prediction } from '../data/mockPredictions'

export const useStudentStore = create(() => ({
  profile,
  prediction,
}))
