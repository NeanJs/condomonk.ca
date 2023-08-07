import { fetchCities } from "@/services/locations";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    handleFetchCities();
  }, []);
  const handleFetchCities = async () => {
    const response = await fetchCities();
    setCities(response);
  };
  return (
    <div className="w-full bg-admin_gray py-4 min-h-[300px] flex flex-col justify-between">
      <div className="w-[95%] mx-auto">
        <div className="flex justify-between">
          <div className="logo-area flex flex-col gap-4 w-[33%]">
            <span>CondoMonk.ca</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed harum
              odit reiciendis ex, impedit ipsam eaque suscipit tempore debitis
              magni, eum adipisci inventore. Voluptate autem aut ut perspiciatis
              unde qui!
            </p>
          </div>
          <div className="popular-cities flex flex-col gap-4">
            <span className="font-bold text-xl">Popular Cities</span>
            <div className="grid gap-2">
              {cities.map((city) => (
                <Link
                  className="hover:text-admin_blue"
                  key={city._id}
                  href={`/${city.name}`}
                >
                  Pre construction condos in {city.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="condos-by-city flex flex-col gap-4">
            <span className="font-bold text-xl">Pre construction Condos</span>
            <div className="grid gap-2">
              {cities.map((city) => (
                <Link
                  className="hover:text-admin_blue"
                  key={city._id}
                  href={`/${city.name}`}
                >
                  Pre construction condos in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="social-links"></div>
        <footer className="text-center pt-4 justify-self-end">
          ©{new Date().getFullYear()} Condomonk
        </footer>
      </div>
    </div>
  );
}
