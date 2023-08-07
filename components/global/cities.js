"use client";
import { fetchCities } from "@/services/locations";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { Loader } from "./Loader";

export default function Cities({ className, city, hidden }) {
  const { data: cities, isLoading } = useQuery("locations", fetchCities, {
    staleTime: Infinity,
    refetchInterval: 0,
  });

  const route = useRouter();

  return (
    <div
      className={`w-full h-fit locations bg-admin_gray p-4 ${
        hidden && "hidden"
      }`}
    >
      {isLoading ? (
        <div className="p-4 flex gap-2 text-xl items-center">
          <Loader />
          <span>Fetching Cities</span>
        </div>
      ) : cities?.length > 0 ? (
        <div className="flex gap-2 items-center flex-wrap ">
          <div className={`cities flex gap-2 items-center p-4 overflow-scroll`}>
            {cities?.map((dat) => (
              <span
                onClick={() => route.push(dat.name)}
                className={`min-w-fit h-fit p-2 shadow-lg cursor-pointer hover:bg-black hover:text-white ease-linear duration-300 ${
                  city == dat.name
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                key={dat._id}
              >
                {dat.name}
              </span>
            ))}
          </div>

          {/* <Button primary onClick={() => route.push("/")}>
            Clear
          </Button> */}
        </div>
      ) : (
        <span>No Cities listed</span>
      )}
    </div>
  );
}
