import { getQueryClient, trpc } from "@/trpc/server";
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  /*
  It is as fast as with a caller in a server component.
  Server component has no data at this moment.
  We are leveraging trpc prefetch and we are 
  populating tanstack query client state with it.
  ...Client component will be populated by server 
  component.
   */
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
         <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
};

export default Page;