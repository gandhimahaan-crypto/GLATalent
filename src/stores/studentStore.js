import { create } from "zustand";
import { mockPrediction, mockStudentProfile } from "../services/mockApi";

export const useStudentStore = create((set) => ({
  profile: mockStudentProfile,
  predictions: {
    probability: mockPrediction.placementProbability,
    readiness: mockPrediction.readinessScore,
    packageRange: mockPrediction.expectedPackage,
    bestDomain: mockPrediction.bestFitDomain.name,
  },
  setProfile: (profile) => set({ profile }),
}));
