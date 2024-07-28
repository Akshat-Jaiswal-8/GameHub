"use server";
import { User } from "@prisma/client";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: {
      id: self.id,
    },
    data: {
      ...validData,
    },
  });

  revalidatePath(`/${user.username}`);
  revalidatePath(`/u/${user.username}`);

  return user;
};
