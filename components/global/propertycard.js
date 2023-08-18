import { checkPricing } from "@/handlers/checkPricing";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property, id }) {
  return (
    <Link
      target={"_blank"}
      href={`/${property.city.toLowerCase()}/${property?.slug}`}
    >
      <div
        key={property?._id}
        className="w-full property lg:w-[300px] bg-admin_white h-[450px] shadow-md shadow-[rgba(0,0,0,.2)] flex flex-col rounded-lg overflow-hidden"
      >
        {property.pictures && (
          <Image
            alt={property?.pictures[0].key}
            width={280}
            height={280}
            className="w-full object-cover h-[280px]"
            src={property?.pictures[0]?.url}
          />
        )}
        {!property.pictures && (
          <img
            loading="lazy"
            src="/noimage.webp"
            className="img-fluid rounded-minet image"
            alt={"no image available for " + property?.name}
          />
        )}

        <div className="property-details flex flex-col items-start gap-2 p-2 md:text-sm">
          <span className="text-xl">{property?.name}</span>
          <span className="text-admin_skyblue text-lg">
            {checkPricing(property?.price)}
          </span>
          <span className="text-admin_dark">{property?.address}</span>
          <span>Move in {property?.completion || "TBD"}</span>
        </div>
      </div>
    </Link>
  );
}
