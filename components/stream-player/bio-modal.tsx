"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { ElementRef, useRef, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string>(initialValue || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("User bio updated!");
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Error updating user bio");
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className={"ml-auto"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className={"space-y-4"}>
          <Textarea
            placeholder={"user bio"}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            disabled={isPending}
            className={"resize-none"}
          />
          <div className={"flex justify-between"}>
            <DialogClose ref={closeRef} asChild>
              <Button variant={"ghost"} type={"button"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
