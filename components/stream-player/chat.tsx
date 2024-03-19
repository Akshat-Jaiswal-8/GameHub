"use client";
import React, { useEffect, useMemo, useState } from "react";
import { chatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useMediaQuery } from "usehooks-ts";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";

import { ConnectionState, RemoteParticipant } from "livekit-client";
import { ChatHeader } from "@/components/stream-player/chat-header";
import { ChatForm } from "@/components/stream-player/chat-form";
import { ChatList } from "./chat-list";

interface ChatProps {
  viewername: string;
  hostIdentity: string;
  hostname: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  viewername,
  hostIdentity,
  hostname,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches: boolean = useMediaQuery("(max-width : 1024px)");
  const { variant, onExpand } = useChatSidebar((state) => state);

  const connectionState = useConnectionState();

  const participant: RemoteParticipant | undefined =
    useRemoteParticipant(hostIdentity);

  const isOnline: boolean | undefined =
    participant && connectionState === ConnectionState.Connected;

  const hidden: boolean = !isChatEnabled || !isOnline;

  const [value, setValue] = useState<string>("");

  const { chatMessages: messages, send } = useChat();

  useEffect((): void => {
    if (matches) onExpand();
  }, [matches, onExpand]);

  const onSubmit = (): void => {
    if (!send) return;
    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };
  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);
  return (
    <div
      className={
        "flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]"
      }
    >
      <ChatHeader />
      {variant === chatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={hidden} />
          <ChatForm
            onSubmit={onSubmit}
            onChange={onChange}
            value={value}
            isHidden={hidden}
            isChatFollowersOnly={isChatFollowersOnly}
            isChatDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === chatVariant.COMMUNITY && <p>community Mode</p>}
    </div>
  );
};
