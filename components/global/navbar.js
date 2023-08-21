import { SelectCityList } from "@/constants/selector";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdArrowDropDown, MdMenu } from "react-icons/md";

export default function Navbar() {
  const route = usePathname();
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="w-full min-h-[10vh] navigation flex items-center justify-center fixed top-0 z-10 bg-white shadow-md">
      <div className="w-full lg:w-[95%] h-full flex items-center justify-between  relative  lg:flex-row gap-4">
        <div className="w-full flex items-center lg:justify-start md:flex-row lg:w-fit lg:p-0 gap-4">
          <Link href="/" className="text-xl h-full">
            <img
              src="/condomonk-bg.png"
              alt="Condomonk.ca"
              className="w-40 object-cover mx-auto"
            />
          </Link>

          <div className="dropdown relative rounded-lg mx-auto text-sm w-fit">
            <button className="btn btn-filter flex items-center lg:w-fit w-[180px] shadow-xl px-2 py-4 border-2 border-admin_gray">
              <span className="text-[12px] lg:text-md ">
                New Condos For Sale
              </span>
              <MdArrowDropDown className="text-xl" />
            </button>

            <div className="dropdown-content top-[100%] lg:min-w-[300px] w-[120%] md:left-0  shadow-2xl mt-1 rounded-lg px-2 z-50">
              <div className="grid grid-cols-2 py-2 gap-2 w-full mx-auto place-items-center">
                {SelectCityList.map((city) => (
                  <Link
                    key={city.name}
                    href={"/" + city.name}
                    className={`text-xs lg:text-base col rounded-lg capitalize ${
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
          className={`gap-8 items-center lg:flex top-[100%] lg:top-0 w-full lg:w-fit py-10 bg-white z-40 right-0 flex-col absolute lg:relative lg:flex-row lg:bg-transparent ${
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
