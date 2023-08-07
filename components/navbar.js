import { useState } from "react";
import { MdArrowDropDown, MdNotifications } from "react-icons/md";

export default function Navbar() {
  const [toggleAccount, setToggleAccount] = useState(false);
  const [toggleNotifications, setToggleNotifications] = useState(false);
  const handleToggleNotfications = () => {
    setToggleNotifications(!toggleNotifications);
    setToggleAccount(false);
  };
  const handleToggleAccount = () => {
    setToggleAccount(!toggleAccount);
    setToggleNotifications(false);
  };
  const sampleData = {
    username: "Admin",
    image: `https://images.pexels.com/photos/13357691/pexels-photo-13357691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
  };
  return (
    <div className="flex flex-row items-end gap-4 relative">
      <div
        onClick={handleToggleAccount}
        className="flex flex-row items-center gap-2 cursor-pointer "
      >
        <img src={sampleData.image} className="w-6 h-6 rounded-full" />
        <h3 className="flex items-center text-md">
          {sampleData.username}
          <MdArrowDropDown className="text-xl" />
        </h3>
        {toggleAccount && (
          <div
            className={`settings-menu  flex flex-col absolute top-10 bg-white w-full p-2 gap-2 shadow-lg rounded-lg`}
          >
            <span>Account</span>
            <span>Settings</span>
            <span>Logout</span>
          </div>
        )}
      </div>
      <div
        className="relative cursor-pointer"
        onClick={handleToggleNotfications}
      >
        <MdNotifications className="text-2xl" />
        <span className="absolute rounded-full bg-red-500 w-4 h-4 flex flex-col items-center justify-center text-white -top-1 -right-1 text-xs">
          8
        </span>
        {toggleNotifications && (
          <div className="notifications absolute right-0 flex flex-col gap-4 min-w-[300px] top-10 max-w-[450px] px-4 py-2 z-10 bg-white shadow-lg rounded-lg">
            <li>1 you have a new notification</li>
            <li>2 you have a new notification</li>
            <li>3 you have a new notification</li>
          </div>
        )}
      </div>
    </div>
  );
}
