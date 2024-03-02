"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import React from "react";
import {
  UserItem,
  UserItemSkeleton,
} from "@/app/(browse)/_components/sidebar/user-item";

interface FollowsProps {
  data: (Follow & { following: User })[];
}

const Following = ({ data }: FollowsProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;
  if (!data.length) return null;
  return (
    <>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-muted-foreground text-sm font-semibold">
            Following
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            imageUrl={follow.following.imageUrl}
            key={follow.following.id}
            username={follow.following.username}
          />
        ))}
      </ul>
    </>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className={"px-2 pt-2 lg:pt-0"}>
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};

export default Following;
