"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const Search = () => {
  const router: AppRouterInstance = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const url = qs.stringifyUrl(
      { url: "/search", query: { term: value } },
      { skipEmptyString: true },
    );
    router.push(url);
  };

  function onClear() {
    setValue("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={"relative w-full lg:w-[400px] flex items-center"}
    >
      <Input
        placeholder="Search"
        className={
          "rounded-r-none focus:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        }
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {value && (
        <X
          onClick={onClear}
          className={
            "absolute top-2.5 right-14 cursor-pointer h-5 w-5  opacity-75 text-muted-foreground transition"
          }
        />
      )}
      <Button
        type={"submit"}
        size={"sm"}
        variant={"secondary"}
        className={"rounded-l-none"}
      >
        <SearchIcon className={"h-5 w-5 text-muted-foreground"} />
      </Button>
    </form>
  );
};
``;

export default Search;
