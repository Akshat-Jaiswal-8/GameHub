"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { onBlock, onUnBlock } from "@/actions/block";

interface ActionsProps {
  isFollowing: boolean;
  isBlockedByThisUser: Boolean;
  userId: string;
}

export const Actions = ({
  isFollowing,
  isBlockedByThisUser,
  userId,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`),
        )
        .catch((e) => toast.error(`${e}`));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`),
        )
        .catch((e) => toast.error(`${e}`));
    });
  };

  const onFollowingClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => {
          if (typeof data !== "boolean") {
            toast.success(`Blocked the user ${data.blocked.username}`);
          }
        })
        .catch((e) => toast.error(`${e}`));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) => {
          if (typeof data !== "boolean") {
            toast.success(`Unblocked the user ${data.blocked.username}`);
          }
        })
        .catch((e) => toast.error(`${e}`));
    });
  };

  const onBlockClick = () => {
    isBlockedByThisUser ? handleUnblock() : handleBlock();
  };

  return (
    <>
      <Button disabled={isPending} onClick={onFollowingClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={onBlockClick}>
        {isBlockedByThisUser ? "Unblock" : "block"}
      </Button>
    </>
  );
};
