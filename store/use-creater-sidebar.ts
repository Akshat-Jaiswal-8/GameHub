import { create } from "zustand";

interface CreaterSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useCreatorSidebar = create<CreaterSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set((): { collapsed: boolean } => ({ collapsed: false })),
  onCollapse: () => set((): { collapsed: boolean } => ({ collapsed: true })),
}));
