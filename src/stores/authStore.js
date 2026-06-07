import { create } from "zustand";

function getInitialAuth() {
  try {
    return JSON.parse(localStorage.getItem("gla-auth")) || {};
  } catch {
    return {};
  }
}

function saveAuth(nextAuth) {
  localStorage.setItem("gla-auth", JSON.stringify(nextAuth));
}

function nameFromEmail(email, role) {
  const fallback = role === "Admin" ? "Admin User" : role === "Placement Officer" ? "Placement Officer" : role === "Faculty" ? "Faculty User" : "Student User";
  if (!email) return fallback;
  const localPart = email.split("@")[0].replace(/[._-]+/g, " ").trim();
  if (!localPart) return fallback;
  return localPart.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function initialsFromName(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const initialAuth = getInitialAuth();

export const useAuthStore = create((set) => ({
  user: initialAuth.user || null,
  role: initialAuth.role || "Student",
  token: initialAuth.token || null,
  login: ({ email, role }) => {
    const name = nameFromEmail(email, role);
    const nextAuth = {
      user: { name, initials: initialsFromName(name), email, role },
      role,
      token: "mock-token",
    };
    saveAuth(nextAuth);
    set(nextAuth);
  },
  logout: () => {
    localStorage.removeItem("gla-auth");
    set({ user: null, role: "Student", token: null });
  },
  setRole: (role) => set({ role }),
}));
