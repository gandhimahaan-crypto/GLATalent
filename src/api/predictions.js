import { prediction } from '../data/mockPredictions'
import { api } from './api'

export function getPrediction() {
  return import.meta.env.VITE_USE_MOCK === 'true' ? Promise.resolve(prediction) : api('/predictions/me')
}
