import { create } from 'zustand'

export const useUiStore = create((set) => ({
  sidebarOpen: true,
  activeTab: 'Overview',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveTab: (activeTab) => set({ activeTab }),
}))
