"use client";

import { QueryClientProvider } from "react-query";
import { queryClient } from "./admin/layout";

import { useRouter } from "next/router";
import Navbar from "@/components/global/navbar";
import Cities from "@/components/global/cities";
import Footer from "@/components/global/footer";
import Head from "next/head";
import Image from "next/image";
import ContactFormB from "@/components/ContactFormB";
export default function HomeLayout({ children, hideFilter }) {
  const params = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="Author" content="Condomonk"></meta>
        <meta name="Email" content="info@condomonk.ca"></meta>
        <title>
          Condomonk | Pre Construction Condos in and around GTA, Canada.
        </title>
        <meta
          name="Description"
          content="Looking for Pre Construction condos near Greater Toronto Area, Canada? From 1 Bed to 4 Bed+ Condos, Condomonk offer early access to all best pre construction's available."
        ></meta>
        <link rel="canonical" href="https://condomonk.ca/" />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:type" content="og:website" />
        <meta
          property="og:title"
          content="Condomonk | Pre Construction Condos in and around GTA, Canada."
        />
        <meta
          property="og:description"
          content="Looking for Pre Construction condos near Greater Toronto Area, Canada? From 1 Bed to 4 Bed+ Condos, Condomonk offer early access to all best pre construction's available."
        />
        <meta property="og:image" content="/aeee.jpg" />
        <meta property="og:url" content="https://condomonk.ca/" />
        <meta property="og:site_name" content="Condomonk" />
      </Head>
      <div className="w-screen min-h-screen h-full flex flex-col items-center justify-start gap-8">
        <div className="flex flex-col w-full ">
          <Navbar />
          <Cities city={params?.query?.city} hidden={hideFilter} />
        </div>
        <div className="w-[95%] min-h-screen flex flex-col">{children}</div>
        <ContactFormB />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
