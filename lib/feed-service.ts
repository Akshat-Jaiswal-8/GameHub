import { getSelf } from "./auth-service";
import { db } from "./db";

export interface GetStreamsProps {
  name: string;
  user: {
    id: string;
    username: string;
    imageUrl: string;
    externalUserId: string;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  id: string;
  thumbnailUrl: string | null;
  isLive: boolean;
}
[];

export const getStreams = async (): Promise<GetStreamsProps[]> => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams: GetStreamsProps[];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }
  return streams;
};
