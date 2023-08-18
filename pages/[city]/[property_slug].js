import ContactForm from "@/components/ContactForm";

import "mapbox-gl/dist/mapbox-gl.css";

import HomeLayout from "@/pages/layout";
import { fetchBySlug, fetchProperties } from "@/services/properties";
import Head from "next/head";

import Link from "next/link";

import { MdPinDrop } from "react-icons/md";
import { Map, Marker } from "react-map-gl";
import { checkPricing } from "@/handlers/checkPricing";
import PropertyBlock from "@/blocks/property";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import ContactFormB from "@/components/ContactFormB";

export default function Property({ property, related }) {
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const handleModal = (image) => {
    setModal(true);
    setModalImage(image);
  };
  return (
    <HomeLayout hideFilter>
      <Head>
        <title>
          {`${property?.name} | Plans, Pricing and Availability - Book Now`}
        </title>
        <meta
          name="Description"
          content={`${property?.name} is a new upcoming townhouse development at ${property.city}, Canada by ${property.developer}. Get access to plans and pricing now`}
        ></meta>
      </Head>

      <div className="property-page w-full flex flex-col gap-4 relative items-center mx-auto">
        {modal && (
          <div className="w-screen h-screen fixed z-50 bg-[rgba(0,0,0,.4)] inset-0 flex items-center justify-center">
            <div className="relative flex items-center flex-col justify-center shadow-2xl rounded-xl w-fit h-fit">
              <span className="bg-white w-10 h-10 rounded-full flex items-center justify-center absolute top-0 right-0 md:-top-5 md:-right-5 z-20">
                <AiFillCloseCircle
                  className="text-4xl text-condo_red"
                  onClick={() => setModal(false)}
                />
              </span>
              <img src={modalImage} classNamew="w-[90%] h-[90%]" />
            </div>
          </div>
        )}
        <div className="property w-full flex flex-col h-full gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold">
              {property?.name}
            </h1>
            <div className="flex flex-wrap text-gray-500 items-center text-sm lg:text-lg gap-0.5">
              <Link className="" href={"/" + property?.city.toLowerCase()}>
                {`New Construction Homes in ${property?.city} >`}
              </Link>
              <span>{` ${property?.name}`}</span>
            </div>
          </div>
          <div className="property-images items-start grid  grid-cols-3 gap-4 ">
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
              <span className="text-4xl font-semibold">{property?.name}</span>
              <span className="text-lg">
                By{" "}
                <strong className="font-semibold text-black">
                  {property?.developer?.name}
                </strong>
              </span>

              <span className="text-condo_red text-xl">
                {checkPricing(property?.price)}
              </span>
              <div className="flex gap-2 items-center">
                <strong className="font-medium text-lg">
                  Project location:
                </strong>
                <Link href={"/" + property?.city} className="underline">
                  {property?.city}
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <strong className="text-lg text-condo_red">
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
              <div className="flex flex-col gap-0.5 my-10">
                <h2 className="font-semibold text-condo_red">
                  Description about {property?.name}
                </h2>
                <div
                  className="flex flex-col leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: property?.description }}
                />
              </div>

              <div className="flex flex-col gap-2 my-10 ">
                <h2 className="font-semibold text-condo_red">
                  Deposit Structure
                </h2>
                <div
                  className="flex flex-col gap-2"
                  dangerouslySetInnerHTML={{ __html: property?.deposits }}
                />
              </div>
              {property?.floorPlans?.length > 0 && (
                <div className="floorplans flex flex-col gap-4 my-10">
                  <h2 className="text-xl font-semibold text-condo_red">
                    Floorplans
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {property.floorPlans.map((floorplan) => (
                      <img
                        onClick={() => handleModal(floorplan.url)}
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
          <div className="flex flex-col gap-4 my-10">
            <div className="map-head flex flex-col gap-2">
              <h2 className="font-semibold text-condo_red">
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
          <ContactFormB property={property} />
          <div className="my-10">
            <PropertyBlock
              max={6}
              related
              properties={related}
              currProp={property?._id}
              city={property.city}
            />
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
  const related_condos = await fetchProperties(res.city);
  return {
    props: {
      property: res,
      related: related_condos,
    },
    revalidate: 10,
  };
}
