import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getStudentProfile } from "../services/api";

export function useStudent(id) {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const profile = await getStudentProfile();
      if (!id || profile.id === id) return profile;

      const dashboard = await getDashboardStats();
      return dashboard.students.find((student) => student.id === id) || profile;
    },
  });
}

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const dashboard = await getDashboardStats();
      return dashboard.students;
    },
  });
}
