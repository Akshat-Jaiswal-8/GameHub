"use client";
import { useParticipants } from "@livekit/components-react";
import React, { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const participants = useParticipants();

  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(value, 500);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Community is disabled</p>
      </div>
    );
  }

  const filteredParticipant = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostViewer = `host-${participant.identity}`;
        if (!acc.some((p: { identity: string }) => p.identity === hostViewer)) {
          acc.push(participant);
        }
        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[]
    );
    return deduped.filter((participant) => {
      return participant?.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  return (
    <div>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        placeholder="Search Community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No Results
        </p>
        {filteredParticipant.map(
          (participant: RemoteParticipant | LocalParticipant) => (
            <CommunityItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantName={participant.name}
              participantIdentity={participant.identity}
            />
          )
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
