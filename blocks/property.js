"use client";
import { fetchProperties } from "@/services/properties";
import Link from "next/link";
import PropertyCard from "../components/global/propertycard";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../components/button";
export default function PropertyBlock({ city }) {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    handleFetchProperties();
  }, []);
  const handleFetchProperties = async () => {
    await fetchProperties(city)
      .then((response) => {
        setProperties(response);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="w-full h-full property-blocks flex flex-col gap-4">
      <div className="block-head flex justify-between flex-wrap">
        <div className="property-head flex flex-col gap-2">
          <h1 className="text-[2em]">{`Pre construction Condos in ${city}`}</h1>

          <p className="text-admin_dark text-sm">
            New {properties?.length} Pre construction Condos for sale in{" "}
            {city || " Canada"} | Check out plans, pricing, availability for pre
            construction condos in {city || "Canada"}
          </p>
        </div>
        <Link href={`/${city}`}>
          <Button
            primary
            className={`text-black border-black hover:border-black hover:bg-black hover:text-white`}
          >
            View all
          </Button>
        </Link>
      </div>

      <div className="properties grid grid-cols-3 gap-4 lg:grid-cols-5">
        {properties?.length > 0 ? (
          properties.map((property) => (
            <PropertyCard property={property} key={property._id} />
          ))
        ) : (
          <span>No Properties Listed</span>
        )}
      </div>
    </div>
  );
}
