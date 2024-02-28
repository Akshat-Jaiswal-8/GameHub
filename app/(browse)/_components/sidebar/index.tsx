"use client";
import React from "react";
import { Wrapper } from "@/app/(browse)/_components/sidebar/wrapper";
import { ArrowLeftFromLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { font } from "@/app/(browse)/_components/navbar/logo";
import { useSidebar } from "@/store/use-sidebar";
import { Toggle } from "./toggle";

export const Sidebar = () => {
  // fetch followed
  // fetch recommend

  
  return (
    <Wrapper>
      <Toggle></Toggle>
    </Wrapper>
  );
};
