"use client";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import ContactFormB from "@/components/ContactFormB";

export const queryClient = new QueryClient();
export default function Layout({ children }) {
  const pathname = usePathname();
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{pathname?.split("/")[2]?.toUpperCase()}</title>
      </Head>
      <div className="min-w-screen max-h-screen text-black flex flex-row items-start ">
        <Sidebar />
        <div className="flex flex-grow flex-col bg-prime min-h-screen p-8 gap-8 flex-[.8]">
          <div className="header flex items-start justify-between">
            <span className="capitalize text-2xl">
              {pathname?.replace("/", " ").replace("/", "  >  ").split("/")[0]}
            </span>
            <Navbar />
          </div>
          <div className="w-full h-full flex flex-col relative gap-2">
            {children}
          </div>
        </div>
      </div>
      <ToastContainer />
    </QueryClientProvider>
  );
}
