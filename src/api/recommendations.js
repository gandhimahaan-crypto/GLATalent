import { recommendations } from '../data/mockRecommendations'
import { api } from './api'

export function getRecommendations() {
  return import.meta.env.VITE_USE_MOCK === 'true' ? Promise.resolve(recommendations) : api('/recommendations')
}
