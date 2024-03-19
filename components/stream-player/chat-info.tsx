import React, { useMemo } from "react";
import { Hint } from "../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const ChatInfo = ({
  isChatDelayed,
  isChatFollowersOnly,
}: ChatInfoProps) => {
  const hint: string | undefined = useMemo(() => {
    if (isChatFollowersOnly && !isChatDelayed) {
      return " Only Followers can chat";
    }
    if (isChatDelayed && !isChatFollowersOnly) {
      return "Messages are delayed by 3 seconds only.";
    }

    if (isChatDelayed && isChatFollowersOnly) {
      return "Only Followers can chat. Messages are delayed by 3 seconds only.";
    }
  }, [isChatFollowersOnly, isChatDelayed]);
  const label = useMemo(() => {
    if (isChatFollowersOnly && !isChatDelayed) {
      return " Followers Only";
    }
    if (isChatDelayed && !isChatFollowersOnly) {
      return "Slow Mode";
    }

    if (isChatDelayed && isChatFollowersOnly) {
      return "Followers Only and Slow Mode.";
    }

    return "";
  }, [isChatFollowersOnly, isChatDelayed]);

  if (!isChatFollowersOnly && !isChatDelayed) return null;
  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};
