"use server";
import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/auth-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
);

export const onBlock = async (id: string) => {
  const self = await getSelf();
  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch (e) {
    // this means user is a guest
  }

  try {
    roomService.removeParticipant(self.id, id);
  } catch {
    // this means the user is not in the room
  }

  revalidatePath("/");
  revalidatePath(`/${self.username}/community`);

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
