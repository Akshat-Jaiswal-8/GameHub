"use client";
import React from "react";
import { useIsClient } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "@/app/(browse)/_components/sidebar/toggle";
import { RecommendedSkeleton } from "@/app/(browse)/_components/sidebar/Recommended";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);
  // const [isClient, setIsClient] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // Alternative way is using use-hook library
  const isClient = useIsClient();

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]",
      )}
    >
      {children}
    </aside>
  );
};
