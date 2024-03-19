import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let index = 0; index < str.length; index++) {
    hash = str.charCodeAt(1) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let index = 0; index < 3; index++) {
    const value = (hash >> (index * 8)) & 0xff;
    color += "00" + value.toString(16).substring(-2);
  }

  return color;
};
