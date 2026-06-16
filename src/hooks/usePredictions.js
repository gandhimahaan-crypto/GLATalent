import { useQuery } from '@tanstack/react-query'
import { getPrediction } from '../api/predictions'

export function usePredictions() {
  return useQuery({ queryKey: ['prediction'], queryFn: getPrediction })
}
