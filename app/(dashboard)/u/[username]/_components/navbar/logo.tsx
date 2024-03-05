import { Poppins } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const font: NextFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className={"flex items-center gap-x-4 hover:opacity-75 transition"}>
        <div
          className={
            "bg-white rounded-full p-1 mr-12 lg:mr-0 lg:shrink shrink-0"
          }
        >
          <Image
            priority={false}
            src={"/spooky.svg"}
            alt={"twitch logo"}
            width={32}
            height={32}
          />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className={"text-xl font-semibold"}>Twitch</p>
          <p className={"text-xs text-muted-foreground"}>let's play</p>
        </div>
      </div>
    </Link>
  );
};
