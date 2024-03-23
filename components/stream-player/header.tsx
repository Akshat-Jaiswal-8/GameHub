import React from "react";
import {
  UserAvatar,
  UserAvatarSkeleton,
} from "@/app/(browse)/_components/sidebar/user-avatar";
import { VerifiedMark } from "@/components/verified-mark";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "@/components/stream-player/actions";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  hostName: string;
  viewerIdentity: string;
  hostIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
}
export const Header = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  name,
  imageUrl,
  isFollowing,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div
      className={
        "flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4"
      }
    >
      <UserAvatar
        username={hostName}
        imageUrl={imageUrl}
        size={"lg"}
        isLive={true}
        showBadge={true}
      />
      <div className={"space-y-1"}>
        <div className={"flex items-center gap-x-2"}>
          <h2 className={"text-lg font-semibold"}>{hostName}</h2>
          <VerifiedMark />
        </div>
        <p className={"text-sm font-semibold"}>{name}</p>
        {isLive ? (
          <div
            className={
              "font-semibold gap-x-1 flex items-center text-xs text-rose-500"
            }
          >
            <UserIcon className={"h-4 w-4"} />
            <p>
              {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
            </p>
          </div>
        ) : (
          <p className={"text-muted-foreground text-sm font-semibold"}>
            Offline
          </p>
        )}
      </div>
      <Actions
        hostIdentity={hostIdentity}
        isFollowing={isFollowing}
        isHost={isHost}
      />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div>
      <div
        className={
          "flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4"
        }
      >
        <div className={"flex items-center gap-x-2"}>
          <UserAvatarSkeleton size={"lg"} />
          <div className={"space-y-2"}>
            <Skeleton className={"h-6 w-32"} />
            <Skeleton className={"h-4 w-24"} />
          </div>
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
