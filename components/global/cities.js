import { preconCityList } from "@/constants/preconCities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function Cities({ city, hidden }) {
  const [showLeftScroll, setshowLeftScroll] = useState(false);

  function rightScrollClick() {
    let scrollDiv = document.querySelector(".scroll-div");
    scrollDiv.scroll({
      left: (scrollDiv.scrollLeft += 150),
      top: 0,
      behavior: "smooth",
    });
    if (scrollDiv.scrollLeft != 0) {
      setshowLeftScroll(true);
    } else {
      setshowLeftScroll(false);
    }
  }

  function leftScrollClick() {
    let scrollDiv = document.querySelector(".scroll-div");
    scrollDiv.scroll({
      left: (scrollDiv.scrollLeft -= 150),
      top: 0,
      behavior: "smooth",
    });
    if (scrollDiv.scrollLeft != 0) {
      setshowLeftScroll(true);
    } else {
      setshowLeftScroll(false);
    }
  }
  const route = useRouter();

  return (
    <div
      className={`w-full h-fit locations bg-admin_gray ${hidden && "hidden"}`}
    >
      {preconCityList?.length > 0 ? (
        <div className="flex gap-2 items-center flex-wrap relative">
          {showLeftScroll && (
            <button
              className="btn bg-admin_gray p-4 shadow-2xl absolute h-100 left-0"
              onClick={leftScrollClick}
            >
              <AiFillCaretLeft />
            </button>
          )}

          <button
            className="btn bg-admin_gray p-4 shadow-2xl rounded-0 right-0  h-100 absolute hh"
            onClick={rightScrollClick}
          >
            <AiFillCaretRight />
          </button>

          <div
            className={`cities ease-linear duration-300 scroll-div flex gap-2 items-center p-4 overflow-scroll`}
          >
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
