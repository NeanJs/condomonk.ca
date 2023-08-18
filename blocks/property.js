import Link from "next/link";
import PropertyCard from "../components/global/propertycard";
import Button from "../components/button";

export default function PropertyBlock({ related, properties, city, currProp }) {
  return (
    <div className="w-full h-full property-blocks flex flex-col gap-4">
      <div className="block-head flex justify-between flex-wrap">
        <div className="property-head flex flex-col gap-2">
          <span
            className={`font-semibold ${related ? "text-3xl" : "text-4xl"}`}
          >{`${
            related
              ? "See similar new construction condos"
              : "New Construction Condos"
          } in ${city}`}</span>
          {!related && (
            <p className="text-admin_dark text-sm">
              New {properties?.length} Pre construction Condos for sale in{" "}
              {city} | Check out plans, pricing, availability for pre
              construction condos in {city}
            </p>
          )}
        </div>
        {/* <Link href={`/`}>
          <Button
            primary
            className={`text-black border-black hover:border-black hover:bg-black hover:text-white`}
          >
            View all
          </Button>
        </Link> */}
      </div>
      <div className="properties grid md:grid-cols-2 gap-4 lg:grid-cols-5">
        {properties?.length > 0 ? (
          properties
            .slice(0, 5)
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
