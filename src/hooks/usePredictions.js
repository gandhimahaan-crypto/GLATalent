import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAIPredictions, getDashboardStats } from "../services/api";

function readStudentProfileData() {
  try {
    const raw = localStorage.getItem("studentProfileData");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function usePredictions() {
  const [profileData, setProfileData] = useState(() => readStudentProfileData());

  useEffect(() => {
    const refreshProfileData = () => setProfileData(readStudentProfileData());

    window.addEventListener("storage", refreshProfileData);
    window.addEventListener("studentProfileDataChanged", refreshProfileData);
    window.addEventListener("focus", refreshProfileData);

    return () => {
      window.removeEventListener("storage", refreshProfileData);
      window.removeEventListener("studentProfileDataChanged", refreshProfileData);
      window.removeEventListener("focus", refreshProfileData);
    };
  }, []);

  return useQuery({
    queryKey: ["predictions", profileData?.submittedAt || profileData?.completion || "no-profile"],
    queryFn: () => getAIPredictions(profileData),
    enabled: Boolean(profileData),
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}
