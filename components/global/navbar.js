import { SelectCityList } from "@/constants/selector";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdArrowDropDown, MdMenu } from "react-icons/md";

export default function Navbar() {
  const route = usePathname();
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="w-full min-h-[10vh] flex items-center justify-center fixed top-0 z-10 bg-white shadow-md">
      <div className="w-full lg:w-[95%] h-full flex items-center justify-between  relative flex-wrap lg:flex-row flex-col">
        <div className="flex items-center justify-between lg:justify-start md:flex-row w-full lg:w-fit p-4 lg:p-0 gap-4 flex-col">
          <Link href="/" className="text-xl">
            <img
              src="/condomonk-bg.png"
              alt="Condomonk.ca"
              className="w-44 object-cover"
            />
          </Link>

          <div className="dropdown relative rounded-lg px-2 py-4 text-sm shadow-xl border-admin_gray border-2 w-fit">
            <button className="btn btn-filter select-options w-[300px] lg:w-fit">
              <span className="mx-1 flex gap-2 items-center ">
                New Condos For Sale <MdArrowDropDown className="text-xl" />
              </span>
            </button>
            <div className="dropdown-content top-[100%] w-full lg:min-w-[300px] left-0 shadow-2xl mt-1 rounded-lg z-50">
              <div className="grid grid-cols-2 py-2 gap-2 w-full mx-auto place-items-center">
                {SelectCityList.map((city) => (
                  <Link
                    key={city.name}
                    href={"/" + city.name}
                    className={`col rounded-lg capitalize ${
                      route == "/" + city.name
                        ? "bg-admin_gray border-admin_gray font-semibold"
                        : ""
                    }`}
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <MdMenu className="flex lg:hidden text-4xl" onClick={handleToggle} />
        <div
          className={`gap-8 items-center flex top-[100%] lg:top-0 w-full lg:w-fit py-10 bg-white z-40 right-0 flex-col absolute lg:relative lg:flex-row lg:bg-transparent ${
            toggle ? "hidden" : "flex"
          }`}
        >
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
