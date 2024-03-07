"use client";
import React, { useState } from "react";
import { UrlCardProps } from "./url-card";
import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({ value }: UrlCardProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onCopy = () => {
    if (!value) {
      return;
    }

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant={"ghost"}
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
