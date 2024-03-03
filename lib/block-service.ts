import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string): Promise<Boolean> => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) throw new Error("User not found");

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: self.id,
          blockerId: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const blockUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) throw new Error("User not found");
    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: otherUser.id,
          blockerId: self.id,
        },
      },
    });
    if (existingBlock) throw new Error("Already blocked");

    const block = await db.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
      include: {
        blocked: true,
      },
    });

    return block;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const unblockUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) throw new Error("User not found");
    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: otherUser.id,
          blockerId: self.id,
        },
      },
    });
    if (!existingBlock) throw new Error("Already unblocked");

    const unblock = await db.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        blocked: true,
      },
    });

    return unblock;
  } catch (e) {
    throw new Error("Unable to unblock user");
  }
};
