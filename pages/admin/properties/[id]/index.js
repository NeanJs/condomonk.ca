"use client";
import { fetchById } from "@/services/properties";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PropertyForm from "../add";

export default function EditProperty() {
  const router = useRouter();
  const [property, setProperty] = useState({});
  const { id } = router.query;
  useEffect(() => {
    fetchById(id)
      .then((response) => {
        setProperty(response);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  }, [router]);
  return <PropertyForm property={property} />;
}
