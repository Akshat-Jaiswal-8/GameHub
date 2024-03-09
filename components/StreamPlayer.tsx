"use client";
import useViewerToken from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import React from "react";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);

  if (!name || !token || !identity) {
    return <div>Cannot Watch the stream</div>;
  }
  return <div>Allowed to watch the stream</div>;
};

export default StreamPlayer;
