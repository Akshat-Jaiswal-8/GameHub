"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "@/components/stream-player/chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  onChange: (value: string) => void;
  value: string;
  isHidden: boolean;
  isFollowing: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}
export const ChatForm = ({
  onSubmit,
  onChange,
  value,
  isHidden,
  isFollowing,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState<boolean>(false);

  const isFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;

  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isChatDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) return null;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo
          isChatDelayed={isChatDelayed}
          isChatFollowersOnly={isChatFollowersOnly}
        />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            (isChatFollowersOnly || isChatDelayed) &&
              "rounded-t-none border-t-0",
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className={"flex flex-col items-center gap-y-4 p-3"}>
      <Skeleton className={"w-full h-10"} />
      <div className={"flex items-center gap-x-2 ml-auto"}>
        <Skeleton className={"h-7 w-7"} />
        <Skeleton className={"h-7 w-12"} />
      </div>
    </div>
  );
};
