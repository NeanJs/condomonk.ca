"use client";
import { fetchById, fetchBySlug } from "@/services/properties";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PropertyForm from "./add";

export default function EditProperty({ property }) {
  return <PropertyForm property={property} />;
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const property = await fetchBySlug(params.id);
  return {
    props: {
      property: property,
    },
  };
}
