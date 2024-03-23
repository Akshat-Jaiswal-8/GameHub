import React from "react";
import { Check } from "lucide-react";

export const VerifiedMark = () => {
  return (
    <div
      className={
        "p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-500"
      }
    >
      <Check className={"h-2.5 w-2.5 text-primary stroke-[4px]"} />
    </div>
  );
};
