import { popularCities } from "@/constants/footer";
import { fetchCities } from "@/services/locations";
import Image from "next/image";
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
    <div className="flex flex-col mt-14">
      <Image
        src="/line.png"
        alt="Line image"
        height="4"
        width="100"
        layout="responsive"
        className="opacity-25"
      />
      <div className="w-full bg-white py-4 min-h-[300px] flex flex-col justify-between">
        <div className="w-[95%] mx-auto p-12">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-between w-full gap-4">
            <div className="flex flex-col gap-5">
              <div className="logo-area w-full flex flex-col gap-0 ">
                <div className="flex gap-2 items-center">
                  {/* <span className="text-3xl">CondoMonk</span> */}
                  <img
                    src="/condomonk-bg.png"
                    alt="canada mapel leaf"
                    className="w-40 object"
                  />
                </div>
                <p className="lg:w-5/6">
                  Condomonk is the online Database for new Pre construction
                  detached, semi-detached, townhomes and condos in Canada.
                  Condomonk does not represent any builder. The content of the
                  pages of this website is for your general information,
                  reference only. We are not liable for the use or misuse of the
                  site's information. Prices, sizes, specifications, and
                  promotions of the condos are subject to change by the builder
                  without notice. E&OE
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="text-dark font-extrabold text-xl">Company</h5>
                <div className="list flex flex-col items-start gap-4">
                  <a href="#" className="mybot">
                    Work with us
                  </a>
                  <a href="#" className="mybot">
                    Blogs
                  </a>
                  <a href="#" className="mybot">
                    Contact us
                  </a>
                  <Link href="/privacy" className="mybot">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
            <div className="popular-cities flex flex-col gap-4">
              <span className="font-bold text-xl">Popular Cities</span>
              <div className="grid gap-2">
                {popularCities.map((city) => (
                  <Link
                    className="hover:text-admin_blue"
                    key={city.city_name}
                    href={`/${city.city_name}`}
                  >
                    Pre construction condos in {city.city_name_cap}
                  </Link>
                ))}
              </div>
            </div>
            <div className="condos-by-city flex flex-col gap-4">
              <span className="font-bold text-xl">Pre construction Condos</span>
              <div className="grid gap-2">
                {popularCities.map((city) => (
                  <Link
                    className="hover:text-admin_blue"
                    key={city.city_name}
                    href={`/${city.city_name}`}
                  >
                    Pre construction condos in {city.city_name_cap}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-tab p-12 w-full flex items-center justify-center flex-col gap-8">
          <div className="social-links flex items-center gap-4">
            <a
              href="https://www.facebook.com/thehomebaba/"
              className=" text-center"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/facebook.svg"
                alt="Facebook Icon which links to condomonk facebook page"
                className="img-fluid social-icon"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCz0QC6Avx_Q_oTENvpp6PWg"
              className=" text-center"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/youtube.png"
                alt="Youtube Icon which links to condomonk facebook page"
                className="img-fluid social-icon"
              />
            </a>
            <a
              href="https://www.instagram.com/homebabaa/"
              className=" text-center"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/instagram.svg"
                alt="Instagram Icon which links to condomonk instagram page"
                className="img-fluid social-icon"
              />
            </a>{" "}
            <a
              href="https://www.linkedin.com/company/condomonk/about/?viewAsMember=true"
              className=" text-center"
            >
              <img
                loading="lazy"
                src="/linkedin.svg"
                alt="Linked Icon which links to condomonk linkedin page"
                className="img-fluid social-icon"
              />
            </a>
            <a
              href="https://www.tiktok.com/@homebabaa"
              className=" text-center"
            >
              <img
                loading="lazy"
                src="/tiktok.png"
                alt="Tiktok Icon which links to condomonk twitter page"
                className="img-fluid social-icon"
              />
            </a>
            <a href="https://twitter.com/homebabaa" className=" text-center">
              <img
                loading="lazy"
                src="/twitter.png"
                alt="Twitter Icon which links to condomonk twitter page"
                className="img-fluid social-icon"
              />
            </a>
          </div>

          <footer className="text-center justify-self-end">
            ©{new Date().getFullYear()} Condomonk
          </footer>
        </div>
      </div>
    </div>
  );
}
