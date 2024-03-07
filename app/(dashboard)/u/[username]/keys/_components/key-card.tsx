"use client";
import { Input } from "@/components/ui/input";
import React, { use, useState } from "react";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";

interface KeyCardProps {
  value: string | null;
}
const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-10">Stream Key </p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              type={show ? "text" : "password"}
              value={value || ""}
              disabled
              placeholder="Stream key"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button
            onClick={() => {
              setShow(!show);
            }}
            className="no-underline"
            size="sm"
            variant="link"
          >
            {show ? "hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
