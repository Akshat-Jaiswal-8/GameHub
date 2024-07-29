import { create } from "zustand";

interface CreatorSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set((): { collapsed: boolean } => ({ collapsed: false })),
  onCollapse: () => set((): { collapsed: boolean } => ({ collapsed: true })),
}));
