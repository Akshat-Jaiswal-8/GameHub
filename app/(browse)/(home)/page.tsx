import UserPage from "@/app/(browse)/[username]/page";
import { router } from "next/client";

export default function Home() {
  return (
    <div className={"flex flex-col gap-y-4"}>
      <p className={"text-xl"}>hello world!</p>
    </div>
  );
}
