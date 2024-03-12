"use client";
import React from "react";
import { Maximize, Minimize } from "lucide-react";
import { Hint } from "@/components/hint";

interface FullscreenControlProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

export const FullscreenControl = ({
  isFullScreen,
  onToggle,
}: FullscreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;

  const label = isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <div className={"flex items-center justify-center gap-4"}>
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className={"text-white hover:bg-white/10 p-1.5 rounded-lg"}
        >
          <Icon className={"h-5 w-5"} />
        </button>
      </Hint>
    </div>
  );
};
