"use server";
import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  const blockedUser = await blockUser(id);
  revalidatePath("/");
  if (blockedUser) {
    if (typeof blockedUser !== "boolean") {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }
  }
  return blockedUser;
};
export const onUnBlock = async (id: string) => {
  const unBlockedUser = await unblockUser(id);
  revalidatePath("/");
  if (unBlockedUser) {
    if (typeof unBlockedUser !== "boolean") {
      revalidatePath(`/${unBlockedUser.blocked.username}`);
    }
  }
  return unBlockedUser;
};
