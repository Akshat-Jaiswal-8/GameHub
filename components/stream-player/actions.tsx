"use client";

import { Button } from "@/components/ui/button";

interface ActionsProps {
  hostIdentity: string;
  isHost: boolean;
  isFollowing: boolean;
}

import React, { useTransition } from "react";
import { useAuth } from "@clerk/nextjs/app-beta/client";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { router } from "next/client";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export const Actions = ({
  hostIdentity,
  isHost,
  isFollowing,
}: ActionsProps) => {
  const { userId } = useAuth();

  const [isPending, startTransition] = useTransition();

  const handleFollow = (): void => {
    startTransition((): void => {
      onFollow(hostIdentity)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`);
        })
        .catch((e): void => {
          toast.error(`${e}`);
        });
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => {
          toast.success(`Successfully Unfollowed ${data.following.username}`);
        })
        .catch((e) => {
          `${e}`;
        });
    });
  };

  const toggleFollow = () => {
    if (userId) return router.push("/sign-in");
    if (isHost) return;
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="default"
      size={"sm"}
      className={"w-full lg:w-auto"}
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return (
    <div>
      <Skeleton className={"h-10 w-full lg:w-24"} />{" "}
    </div>
  );
};
