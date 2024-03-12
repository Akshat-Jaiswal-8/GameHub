import Index from "@/components/stream-player";
import { getUserByUserName } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";
import React from "react";

interface CreaterPageProps {
  params: {
    username: string;
  };
}

const CreaterPage = async ({ params }: CreaterPageProps) => {
  const externalPageUser = await currentUser();
  const user = await getUserByUserName(params.username);

  if (!user || user.externalUserId !== externalPageUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }
  return (
    <div className="h-full">
      <Index user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreaterPage;
