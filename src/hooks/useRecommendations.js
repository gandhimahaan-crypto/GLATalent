import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../services/api";

export function useRecommendations() {
  return useQuery({ queryKey: ["recommendations"], queryFn: getRecommendations });
}
