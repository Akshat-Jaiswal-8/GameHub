import React from "react";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "@/app/(browse)/[username]/_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUserName(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByThisUser = await isBlockedByUser(user.id);
  if (isBlockedByThisUser) return notFound();
  return (
    <div className={"flex flex-col gap-y-4"}>
      <p>User : {params.username}</p>
      <p>{`${isFollowing}`}</p>
      <p>{`${isBlockedByThisUser}`}</p>
      <Actions
        isBlockedByThisUser={isBlockedByThisUser}
        isFollowing={isFollowing}
        userId={user.id}
      />
    </div>
  );
};

export default UserPage;
