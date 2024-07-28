import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/app/(browse)/_components/sidebar/user-avatar";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { UserAvatarSkeleton } from "@/components/user-avatar";

interface ResultCardProps {
  data: {
    name: string;
    user: {
      id: string;
      username: string;
      imageUrl: string;
      externalUserId: string;
      bio: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
    id: string;
    isLive: boolean;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: ResultCardProps): React.JSX.Element => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500 transition duration-100">
              {data.name}
            </p>
            <p className="text-muted-foreground">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export function ResultCardSkeleton(): React.JSX.Element {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
