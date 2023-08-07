import { fetchCityByName } from "@/services/locations";
import { fetchProperties } from "@/services/properties";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropertyCard from "@/components/global/propertycard";

import HomeLayout from "../layout";
import Head from "next/head";

export default function PropertyByCity() {
  const route = useRouter();
  const { city } = route.query;
  const [properties, setProperties] = useState([]);
  const [cityData, setCityData] = useState({});
  useEffect(() => {
    handleGetCityData();
    handleGetProperties();
  }, [route]);
  const handleGetCityData = async () => {
    await fetchCityByName(city)
      .then((res) => {
        setCityData(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleGetProperties = async () => {
    await fetchProperties(city)
      .then((res) => {
        setProperties(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <HomeLayout withFilter={false}>
      <Head>
        <title>Pre construction Condos in {city}</title>
        <meta
          name="description"
          content={`${properties?.length} New Pre construction Condos for sale in ${city}|
        Check out plans, pricing, availability for pre construction condos in{" "}
        ${city}`}
        />
      </Head>
      <div className="flex flex-col items-start gap-8">
        <div className="meta-content w-full">
          <h1 className="text-[2em]">Pre construction Condos in {city}</h1>

          <p className="text-admin_dark text-sm">
            {properties?.length} New Pre construction Condos for sale in {city}{" "}
            | Check out plans, pricing, availability for pre construction condos
            in {city}
          </p>
        </div>
        <div className="content w-full  flex flex-col justify-between bg-white min-h-screen">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 self-start gap-4">
            {properties.length > 0 ? (
              properties.map((property, id) => (
                <PropertyCard key={property._id} property={property} id={id} />
              ))
            ) : (
              <span>No Properties Listed!</span>
            )}
          </div>
          {cityData && (
            <div
              className="property-page w-full self-end justify-self-end h-full"
              dangerouslySetInnerHTML={{ __html: cityData?.description }}
            />
          )}
        </div>
      </div>
    </HomeLayout>
  );
}
