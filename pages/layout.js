"use client";

import { QueryClientProvider } from "react-query";
import { queryClient } from "./admin/layout";

import { useRouter } from "next/router";
import Navbar from "@/components/global/navbar";
import Cities from "@/components/global/cities";
import Footer from "@/components/global/footer";
import Head from "next/head";
export default function HomeLayout({ children, hideFilter }) {
  const params = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Condomonk.ca</title>
      </Head>
      <div className="w-screen min-h-screen h-full flex flex-col items-center justify-start gap-8">
        <div className="flex flex-col w-full ">
          <Navbar />
          <Cities city={params?.query?.city} hidden={hideFilter} />
        </div>
        <div className="w-[95%] min-h-screen flex flex-col">{children}</div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
