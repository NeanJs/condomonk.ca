import { fetchCityByName } from "@/services/locations";
import { fetchProperties } from "@/services/properties";
import { useRouter } from "next/router";

import PropertyCard from "@/components/global/propertycard";

import HomeLayout from "../layout";
import Head from "next/head";

import ContactFormB from "@/components/ContactFormB";

export default function PropertyByCity({ properties, cityData }) {
  const route = useRouter();

  const { city } = route.query;

  function capitalize(str) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  }
  return (
    <HomeLayout withFilter={false}>
      <Head>
        <title>
          {`${cityData?.name || capitalize(city)} New Construction Condos | Condomonk.ca`}
        </title>
        <meta
          name="description"
          content={`${properties?.length} New Construction Condos for sale in ${cityData?.name || capitalize(city)} |
        Check out plans, pricing, availability for pre construction condos in ${  cityData?.name || capitalize(city)
        }`}
        />
      </Head>
      <div className="flex flex-col items-start gap-8">
        <div className="meta-content w-full">
          <h1 className="text-[2em]">
            New construction Condos in {capitalize(city)}
          </h1>

          <p className="text-admin_dark text-sm">
            {properties?.length} New Pre construction Condos for sale in
            {capitalize(city)} | Check out plans, pricing, availability for pre
            construction condos in {capitalize(city)}
          </p>
        </div>
        <div className="content w-full flex flex-col justify-between bg-white min-h-screen">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 self-start gap-4">
            {properties?.length > 0 ? (
              properties?.map((property, id) => (
                <PropertyCard key={property._id} property={property} id={id} />
              ))
            ) : (
              <span>No Properties Listed!</span>
            )}
          </div>
          <ContactFormB img={"/reg.webp"} />
          {cityData && (
            <div
              className="property-page w-full lg:w-4/5 mx-auto h-full my-20"
              dangerouslySetInnerHTML={{ __html: cityData?.description }}
            />
          )}
        </div>
      </div>
    </HomeLayout>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const properties = await fetchProperties(params.city);
  const cityData = await fetchCityByName(params.city);
  return {
    props: {
      properties,
      cityData,
    },
  };
}
