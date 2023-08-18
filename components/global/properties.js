import { fetchProperties } from "@/services/properties";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../button";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { api } from "@/handlers/axios";
import { useQuery } from "react-query";
import { fetchCities } from "@/services/locations";
import { Loader } from "./Loader";
import { checkPricing } from "@/handlers/checkPricing";
export default function Properties({ admin }) {
  const [properties, setProperties] = useState([]);
  const {
    data: cities,
    isLoading,
    isSuccess,
    isError,
  } = useQuery("locations", fetchCities);
  const [city, setCity] = useState("");

  const router = useRouter();
  useEffect(() => {
    handleFetchProperties();
  }, [city]);
  const handleFetchProperties = async () => {
    await fetchProperties(city)
      .then((response) => {
        setProperties(response);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  const handleDeleteProperty = async (property) => {
    Swal.fire({
      title: "Do you want to delete it?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#E63A56",
      confirmButtonText: "Delete",
    }).then(async (response) => {
      if (response.isConfirmed) {
        await api
          .post("delete/multiple", {
            id: property._id,
            keys: property.pictures,
          })
          .then((res) => {
            toast.success(res.data.message);
            handleFetchProperties();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
    });
  };
  return (
    <div className={`properties flex flex-col w-full h-full bg-admin_white `}>
      <div className="w-full h-fit p-4 flex flex-col items-start gap-2">
        {admin && (
          <div className="city-filter flex flex-col gap-2 w-full ">
            <span>Filter by city:</span>
            {cities?.length > 0 ? (
              <div
                className={`cities flex gap-2 items-center overflow-scroll p-4 bg-admin_gray`}
              >
                {cities?.map((dat) => (
                  <span
                    onClick={() => setCity(dat.name)}
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

                <Button primary onClick={() => setCity(null)} className="">
                  Clear
                </Button>
              </div>
            ) : (
              <span>No Cities listed</span>
            )}
          </div>
        )}
      </div>

      <div className="max-h-full flex flex-col items-start p-4">
        <div className="meta-content">
          <h1 className="text-[2em]">
            Pre construction condos in {city || "Canada"}
          </h1>
        </div>
        {
          <div className="flex w-full max-h-full properties-body justify-start">
            {properties?.length > 0 ? (
              <div
                className={`properties-list gap-4 grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 xl:grid-cols-4 overflow-y-auto p-4 ${
                  admin ? "h-[500px]" : "min-h-screen"
                }`}
              >
                {properties?.map((property, id) => (
                  <div
                    key={property._id}
                    className="property min-w-[280px] bg-admin_white h-[480px] shadow-lg flex flex-col gap-1 rounded-xl overflow-hidden"
                  >
                    <img
                      className="w-full object-cover min-h-[240px]"
                      src={property?.pictures[0]?.url}
                    />

                    <div className="property-details flex flex-col items-start gap-2 p-2 md:text-sm">
                      <span className="text-xl font-medium">
                        {property?.name}
                      </span>
                      <span className="text-admin_skyblue  text-lg">
                        {checkPricing(property.price) || property?.price}
                      </span>
                      <span className="text-admin_dark">
                        {property?.address}
                      </span>
                      <span>Move in {property?.completion}</span>
                      {admin && (
                        <span className="action-btns flex gap-2">
                          <Button
                            onClick={() =>
                              router.push(`properties/${property.slug}`)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteProperty(property)}
                          >
                            Delete
                          </Button>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex">No properties listed!</div>
            )}
          </div>
        }
      </div>
    </div>
  );
}
