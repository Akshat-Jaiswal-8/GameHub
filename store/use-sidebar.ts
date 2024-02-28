import { Sidebar } from "@/app/(browse)/_components/sidebar";
import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set((): { collapsed: boolean } => ({ collapsed: false })),
  onCollapse: () => set((): { collapsed: boolean } => ({ collapsed: true })),
}));
