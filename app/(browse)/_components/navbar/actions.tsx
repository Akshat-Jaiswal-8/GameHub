import React from "react";
import { currentUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard } from "lucide-react";

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className={"flex items-center justify-end gap-x-2 ml-4 lg:ml-0"}>
      {!user && (
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      )}
      {!!user && (
        <div className={"flex items-center gap-x-4"}>
          <Button
            className={"text-muted-foreground hover:text-primary"}
            size={"sm"}
            variant={"ghost"}
            asChild
          >
            <Link href={`/${user.username}`}>
              <Clapperboard className={"w-5 h-5 lg:mr-2"} />
              <span className={"hidden lg:block"}>Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl={"/"} />
        </div>
      )}
    </div>
  );
};

export default Actions;
