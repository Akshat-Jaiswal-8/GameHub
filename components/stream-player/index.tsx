"use client";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import React, { use } from "react";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "@/components/stream-player/Video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import { ChatToggle } from "@/components/stream-player/chat-toggle";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

const Index = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { token, name } = useViewerToken(user.id);

  const { collapsed } = useChatSidebar((state) => state);

  return (
    <>
      {collapsed && (
        <div className={"hidden lg:block fixed top-[100px] right-2 z-50"}>
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostname={user.username} hostIdentity={user.id} />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewername={name}
            hostIdentity={user.id}
            hostname={user.username}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default Index;
