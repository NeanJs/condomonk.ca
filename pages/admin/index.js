import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "./layout";

export default function Home() {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("admin/dashboard");
  });
  return (
    <>
      <Layout />
    </>
  );
}
