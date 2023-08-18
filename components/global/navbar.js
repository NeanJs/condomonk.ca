import { preconCityList } from "@/constants/preconCities";
import { SelectCityList } from "@/constants/selector";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { MdArrowDropDown, MdMenu } from "react-icons/md";

export default function Navbar() {
  const route = usePathname();
  return (
    <div className="w-full min-h-[10vh] flex items-center justify-center shadow-lg">
      <div className="w-[95%] h-full flex items-center bg-white justify-between">
        <div className="logo-container flex gap-4 items-center">
          <Link href="/" className=" text-xl">
            <img src="/condomonk-bg.png" alt="Condomonk.ca" />
          </Link>

          <div className="dropdown relative rounded-lg min-w-fit px-2 py-4 text-sm shadow-xl border-admin_gray border-2 w-fit">
            <button className="btn btn-filter select-options dropbtn w-full">
              <span className="mx-1 flex gap-2 items-center ">
                New Condos For Sale <MdArrowDropDown className="text-xl" />
              </span>
            </button>
            <div className="dropdown-content top-[100%] min-w-[300px] left-0 shadow-2xl mt-1 rounded-lg z-50">
              <div className="grid grid-cols-2 py-2 gap-2 w-full mx-auto place-items-center">
                {SelectCityList.map((city) => (
                  <Link
                    key={city.name}
                    href={"/" + city.name}
                    className={`col rounded-lg capitalize ${
                      route == "/" + city.name
                        ? "bg-admin_gray border-admin_gray"
                        : ""
                    }`}
                  >
                    {" "}
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <MdMenu className="flex lg:hidden " />
        <div className="gap-4 items-center hidden lg:flex">
          <Link href="/blogs">Blogs</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}

{
  /* <select onClick={(e) => route.push(e.target.value)}>
  <option>Popular Cities</option>
  {cities?.length > 0 &&
    cities?.map((res) => (
      <option value={res.name}>{res.name}</option>
    ))}
</select> */
}
