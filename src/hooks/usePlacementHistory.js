import { useQuery } from '@tanstack/react-query'
import { getPlacements } from '../api/placements'

export function usePlacementHistory() {
  return useQuery({ queryKey: ['placements'], queryFn: getPlacements })
}
