import Link from "next/link";

export default function PropertyCard({ property, id }) {
  return (
    <Link target={"_blank"} href={`properties/${property?._id}`}>
      <div
        key={property?._id}
        className="property min-w-[280px] bg-admin_white h-fit shadow-lg flex flex-col rounded-lg"
      >
        <img
          className="w-full object-cover h-[280px] object-top"
          src={property?.pictures[0]?.url}
        />

        <div className="property-details flex flex-col items-start gap-2 p-2 md:text-sm">
          <span className="text-xl font-bold">{property?.name}</span>
          <span className="text-admin_skyblue">
            {property.deposit
              ? `Starting from low $ ${property?.deposit}`
              : "No pricing available"}
          </span>
          <span className="text-admin_dark">
            {property?.name}, {property?.location}
          </span>
          <span>Move in {property?.occupancy || "TBD"}</span>
        </div>
      </div>
    </Link>
  );
}
