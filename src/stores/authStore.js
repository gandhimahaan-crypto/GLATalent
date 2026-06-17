import { create } from "zustand";

const ADMIN_EMAIL = "glaadmin@gmail.com";
const ADMIN_PASSWORD = "Admin12@GLA";
const allowedRoles = ["student", "faculty", "admin"];

function normalizeRole(role) {
  const normalizedRole = String(role || "").toLowerCase();
  return allowedRoles.includes(normalizedRole) ? normalizedRole : "student";
}

function isAdminCredential(email, password) {
  return email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

function isSavedAdmin(auth) {
  return normalizeRole(auth.role) === "admin" && auth.user?.email?.toLowerCase() === ADMIN_EMAIL && auth.token === "mock-admin-token";
}

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
  const fallback = role === "admin" ? "GLA System Administrator" : role === "faculty" ? "Faculty User" : "Student User";
  if (!email) return fallback;
  if (role === "admin") return fallback;
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
const savedRole = normalizeRole(initialAuth.role);
const initialRole = savedRole === "admin" && !isSavedAdmin(initialAuth) ? "student" : savedRole;
const initialUser = initialAuth.user
  ? { ...initialAuth.user, role: initialRole }
  : null;

export const useAuthStore = create((set) => ({
  user: initialUser,
  role: initialRole,
  token: initialAuth.token || null,
  login: ({ email, password, role }) => {
    if (isAdminCredential(email, password)) {
      const nextAuth = {
        user: { name: "GLA System Administrator", initials: "GA", email: ADMIN_EMAIL, role: "admin" },
        role: "admin",
        token: "mock-admin-token",
      };
      saveAuth(nextAuth);
      set(nextAuth);
      return { ok: true, role: "admin" };
    }

    const requestedRole = normalizeRole(role);
    if (requestedRole === "admin") {
      return { ok: false, message: "Use the fixed Admin demo credentials to access the Admin Dashboard." };
    }

    const nextRole = requestedRole;
    const name = nameFromEmail(email, nextRole);
    const nextAuth = {
      user: { name, initials: initialsFromName(name), email, role: nextRole },
      role: nextRole,
      token: `mock-${nextRole}-token`,
    };
    saveAuth(nextAuth);
    set(nextAuth);
    return { ok: true, role: nextRole };
  },
  logout: () => {
    localStorage.removeItem("gla-auth");
    set({ user: null, role: "student", token: null });
  },
  setRole: (role) => set({ role: normalizeRole(role) }),
}));
