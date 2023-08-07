"use client";
import { fetchCityById } from "@/services/locations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CityForm from "../add";

export default function EditCity() {
  const router = useRouter();
  const [city, setCity] = useState({});
  const { id } = router.query;

  useEffect(() => {
    handleFetchCity();
  }, [router]);
  const handleFetchCity = async () =>
    await fetchCityById(id)
      .then((response) => {
        setCity(response);
      })
      .catch((err) => {
        toast.error(err);
      });
  return <CityForm cityProps={city} />;
}
