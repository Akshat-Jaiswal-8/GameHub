import {
  Results,
  ResultsSkeleton,
} from "@/app/(browse)/(home)/_components/results";
import React, { Suspense } from "react";

export default function Home(): React.JSX.Element {
  return (
    <div className={"h-full p-8 max-w-screen-2xl mx-auto"}>
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
