"use client";
import React from "react";
import {
  TrackReference,
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { OfflineVideo } from "@/components/stream-player/offline-video";
import { Loading } from "@/components/stream-player/loading-video";
import { LiveVideo } from "@/components/stream-player/live-video";

interface VideoProps {
  hostname: string;
  hostIdentity: string;
}
function Video({ hostname, hostIdentity }: VideoProps) {
  const connectionState = useConnectionState();

  const participant = useRemoteParticipant(hostIdentity);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter(
    (track: TrackReference): boolean =>
      track.participant.identity === hostIdentity,
  );

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostname} />;
  } else if (!participant || tracks.length == 0) {
    content = <Loading label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return (
    <div className={"aspect-video border-b group relative"}>{content}</div>
  );
}

export default Video;
