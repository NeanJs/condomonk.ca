import Button from "@/components/button";
import Link from "next/link";
import PropertyCard from "../components/global/propertycard";

export default function PropertyBlock({
  related,
  properties,
  city,
  currProp,
  max,
}) {
  return (
    <div className="w-full h-full property-blocks flex flex-col gap-4">
      <div className="block-head flex justify-between flex-wrap">
        <div className="property-head flex flex-col gap-2">
          <span
            className={`font-semibold ${
              related ? "text-3xl" : "text-xl md:text-2xl lg:text-4xl"
            }`}
          >{`${
            related
              ? "See similar new construction condos"
              : "New Construction Condos"
          } in ${city}`}</span>
          {!related && (
            <p className="text-admin_dark text-xs lg:text-sm">
              New {properties?.length} Pre construction Condos for sale in{" "}
              {city} | Check out plans, pricing, availability for pre
              construction condos in {city}
            </p>
          )}
        </div>
        {/* <Link href={`/${city.toLowerCase()}`}>
          <Button
            primary
            className={`text-black border-black hover:border-black hover:bg-black hover:text-white`}
          >
            View all
          </Button>
        </Link> */}
      </div>
      <div className="properties w-full grid md:grid-cols-2 gap-4 lg:grid-cols-5">
        {properties?.length > 0 ? (
          properties
            .slice(0, max || 5)
            .map(
              (property) =>
                property._id !== currProp && (
                  <PropertyCard property={property} key={property._id} />
                )
            )
        ) : (
          <span>No Properties Listed</span>
        )}
      </div>
    </div>
  );
}
