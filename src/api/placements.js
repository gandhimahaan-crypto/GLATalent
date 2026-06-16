import { placements } from '../data/mockPlacements'
import { api } from './api'

export function getPlacements() {
  return import.meta.env.VITE_USE_MOCK === 'true' ? Promise.resolve(placements) : api('/placements')
}
