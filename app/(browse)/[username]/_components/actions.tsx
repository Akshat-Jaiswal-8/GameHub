"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { ReactNode, useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions = ({ isFollowing, userId }: ActionProps): ReactNode => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are following ${data.following.username}`),
        )
        .catch(() => toast.error("Unable to follow the user"));
    });
    const handleUnfollow = () => {
      startTransition(() => {
        onUnfollow(userId)
          .then((data) =>
            toast.success(`You Unfollowed ${data.following.username}`),
          )
          .catch(() => toast.error("Unable to Unfollow the user"));
      });
      const onClick = () => {
        if (isFollowing) handleUnfollow();
        else handleFollow();
      };
      return (
        <Button disabled={isPending} onClick={onClick} variant={"secondary"}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      );
    };
  };
};
