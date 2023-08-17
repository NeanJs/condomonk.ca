import ContactForm from "@/components/ContactForm";

import { Loader } from "@/components/global/Loader";
import "mapbox-gl/dist/mapbox-gl.css";

import HomeLayout from "@/pages/layout";
import { fetchBySlug } from "@/services/properties";
import Head from "next/head";

import Link from "next/link";

import { MdPinDrop } from "react-icons/md";
import { Map, Marker } from "react-map-gl";
import nFormatter from "@/components/nFormatter";
import { checkPricing } from "@/handlers/checkPricing";

export default function Property({ property }) {
  return (
    <HomeLayout hideFilter>
      <Head>
        <title>{property?.name}</title>
      </Head>

      <div className="property-page w-4/5 flex flex-col gap-4 mx-auto">
        {/* <div className="redirect flex gap-8">
          <Link href={"/"} className="flex gap-2 items-center">
            <BsArrowLeft /> Go back to search
          </Link>
          <div className="links flex gap-1">
            <Link className="text-gray-500" href={`/${property?.city}`}>
              {property?.city}
            </Link>
            {">"}
            <span>{property?.name}</span>
          </div>
        </div> */}

        <div className="property w-full flex flex-col h-full gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl">{property?.name}</h1>
            <span className="text-gray-500">
              {`New Construction Homes in ${property?.city} > ${property?.name}`}
            </span>
          </div>
          <div className="property-images items-start grid grid-cols-3 gap-4">
            {property?.pictures?.slice(0, 6).map((image) => (
              <div className="image-container w-full h-[350px]" key={image.key}>
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={image.url}
                  alt={image.key}
                />
              </div>
            ))}
            {property?.pictures?.length < 6 &&
              property?.floorPlans?.map((plan) => (
                <img
                  src={plan.url}
                  key={plan.key}
                  className="w-full h-full object-cover rounded-lg"
                />
              ))}
          </div>
          <div className="flex flex-wrap">
            <div className="property-content flex flex-col gap-2 lg:w-3/5 my-4">
              <span className="text-4xl">{property?.name}</span>
              <span className="text-lg">
                By{" "}
                <strong className="font-semibold">{property?.developer}</strong>
              </span>

              <span className="text-admin_skyblue text-xl">
                {checkPricing(property?.price)}
              </span>
              <div className="flex gap-2 items-center">
                <strong className="font-medium text-lg">
                  Project location:
                </strong>
                <Link href={"/" + property.city} className="underline">
                  {property?.city}
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <strong className="text-lg">
                  <MdPinDrop />
                </strong>
                <span className="">{property?.address}</span>
              </div>
              <div className="flex gap-2 items-center">
                <strong className="font-medium text-lg">Completion:</strong>
                <span className="">{property?.completion}</span>
              </div>
              <div className="flex gap-2 items-center">
                <strong className="font-medium text-lg">Project Status:</strong>
                <span className="capitalize">{property?.status}</span>
              </div>
              <div className="flex flex-col gap-0.5 my-5">
                <h2 className="font-semibold">
                  Description about {property?.name}
                </h2>
                <div
                  className="flex flex-col leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: property?.description }}
                />
              </div>

              <div className="flex flex-col gap-2 my-5 ">
                <h2 className="font-medium">Deposit Structure</h2>
                <div
                  className="flex flex-col gap-2"
                  dangerouslySetInnerHTML={{ __html: property?.deposits }}
                />
              </div>
              {property?.floorPlans?.length > 0 && (
                <div className="floorplans flex flex-col gap-4">
                  <h2 className="text-xl font-medium">Floorplans</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {property.floorPlans.map((floorplan) => (
                      <img
                        className="drop-shadow-md"
                        src={floorplan.url}
                        alt={floorplan.key}
                        key={floorplan.key}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:w-2/5 relative">
              <ContactForm />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="map-head flex flex-col gap-2">
              <h2 className="font-medium">
                Property Location - {property.name}
              </h2>
              <span className="text-xs text-gray-500">
                Note : The exact location of the project may be vary from the
                address shown here
              </span>
            </div>
            <Map
              initialViewState={{
                latitude: property?.latitude || 0,
                longitude: property?.longitude || 0,
                zoom: 14,
              }}
              style={{ width: "100%", height: 600 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken="pk.eyJ1IjoidmlzaGFsZGhha2FsOTkiLCJhIjoiY2tocjN2bWh6MDZpZzJybGg0NXJtcm8waCJ9.TBbd_lsF-2Z9s_lqm754zg"
            >
              <Marker
                longitude={property?.longitude || 0}
                latitude={property?.latitude || 0}
                color="red"
              />
            </Map>
          </div>
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
  const res = await fetchBySlug(params?.property_slug);

  return {
    props: {
      property: res,
    },
    revalidate: 10,
  };
}
