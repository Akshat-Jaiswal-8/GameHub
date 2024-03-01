import React from "react";
import { getSelf } from "@/lib/auth-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Button } from "@/components/ui/button";
import { Actions } from "@/app/(browse)/[username]/_components/actions";

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

  return (
    <div className={"flex flex-col gap-y-4"}>
      <p>User : {params.username}</p>
      <p>{`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
