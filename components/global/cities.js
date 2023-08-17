import { preconCityList } from "@/constants/preconCities";
import { useRouter } from "next/navigation";

export default function Cities({ city, hidden }) {
  // const { data: cities, isLoading } = useQuery("locations", fetchCities, {
  //   staleTime: Infinity,
  //   refetchInterval: 0,
  // });

  const route = useRouter();

  return (
    <div
      className={`w-full h-fit locations bg-admin_gray ${hidden && "hidden"}`}
    >
      {preconCityList?.length > 0 ? (
        <div className="flex gap-2 items-center flex-wrap ">
          <div className={`cities flex gap-2 items-center p-4 overflow-scroll`}>
            {preconCityList?.map((dat) => (
              <span
                onClick={() => route.push(dat.city_name)}
                className={`min-w-fit h-fit px-4 pt-4 pb-3 shadow-lg cursor-pointer bg-white border-transparent border-b-4 hover:border-black ease-linear duration-300 rounded-lg ${
                  city == dat.city_name
                    ? "border-black border-b-4"
                    : "border-transparent"
                }`}
                key={dat.city_name}
              >
                {dat.city_name_cap}
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
