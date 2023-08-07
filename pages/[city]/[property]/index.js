import { Loader } from "@/components/global/Loader";

import HomeLayout from "@/pages/layout";
import { fetchById } from "@/services/properties";
import Head from "next/head";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Property() {
  const router = useRouter();
  useEffect(() => {
    handleFetchProperty();
  }, [router]);

  const [property, setProperty] = useState();
  const handleFetchProperty = async () => {
    await fetchById(router.query.property)
      .then((res) => {
        setProperty(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <HomeLayout hideFilter>
      <Head>
        <title>{property?.name}</title>
      </Head>

      <div className="property-page flex flex-col gap-4">
        <div className="redirect flex gap-8">
          <Link href={"/"} className="flex gap-2 items-center">
            <BsArrowLeft /> Go back to search
          </Link>
          <div className="links flex gap-1">
            <Link className="text-gray-500" href={`/${property?.location}`}>
              {property?.location}
            </Link>
            {">"}
            <span>{property?.name}</span>
          </div>
        </div>
        {property ? (
          <div className="property w-full flex flex-col h-full gap-4">
            <div className="property-images grid grid-cols-2">
              <img
                className="w-3/5  object-cover"
                src={property?.pictures[0].url}
                alt={property.name}
              />
              <div className="optional-images grid grid-flow-col-dense">
                {property?.pictures
                  ?.slice(1, property.pictures.length)
                  .map((image) => (
                    <img
                      className=""
                      key={image.key}
                      src={image.url}
                      alt={image.key}
                    />
                  ))}
              </div>
            </div>
            <div className="property-content flex flex-col gap-2">
              <h1 className="text-5xl font-bold">
                {property?.name} - {property?.location}
              </h1>
              <span className="text-admin_skyblue text-2xl font-bold">
                $ {property?.deposit}
              </span>
              <div className="flex gap-2 items-center">
                <strong className="font-black text-lg">
                  Project Location:
                </strong>
                <span className="">{property?.location}</span>
              </div>
              <div className="flex gap-2 items-center">
                <strong className="font-black text-lg">Completion:</strong>
                <span className="">{property?.occupancy}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div
                  className="flex flex-col gap-2"
                  dangerouslySetInnerHTML={{ __html: property?.description }}
                />
              </div>
            </div>
          </div>
        ) : (
          <span>
            <Loader />
          </span>
        )}
      </div>
    </HomeLayout>
  );
}
