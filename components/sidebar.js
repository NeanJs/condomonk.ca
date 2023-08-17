"use client";
import Link from "next/link";

import { FcHome } from "react-icons/fc";
import { usePathname } from "next/navigation";
import {
  MdSpaceDashboard,
  MdSettings,
  MdFeedback,
  MdPerson,
} from "react-icons/md";

import { BsCloudUploadFill } from "react-icons/bs";
import Button from "./button";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const LINKS = [
    {
      title: "Dashboard",
      icon: <MdSpaceDashboard />,
      path: "admin/dashboard",
    },
    {
      title: "Properties",
      icon: <BsCloudUploadFill />,
      path: "admin/properties",
    },
    {
      title: "Cities",
      icon: <MdFeedback />,
      path: "admin/cities",
    },
    {
      title: "Developers",
      icon: <MdPerson />,
      path: "admin/developers",
    },
  ];
  const handleLogout = () => {};
  const pathname = usePathname();
  return (
    <aside className="sidebar left-0 flex flex-col bg-primary p-4 h-screen w-fit gap-8">
      <Link
        href={""}
        className="flex items-end gap-2 mb-4 px-2  text-xs md:text-2xl tracking-wider"
      >
        <span className="flex items-center gap-2 text-xl capitalize ">
          <FcHome />
          <span className="hidden md:block">CondoMonk.ca</span>
        </span>
      </Link>
      <div className="flex flex-col items-start justify-between flex-1">
        <nav className="flex flex-col items-stretch gap-2 font-light">
          {LINKS.map((link, _id) => (
            <Link
              className={`link flex min-w-max flex-row gap-4 items-center text-md p-4 rounded-lg ${
                pathname?.includes(link?.path)
                  ? "text-white bg-black "
                  : "text-gray-500"
              }`}
              href={`/${link?.path}`}
              key={`${link?.title}-${_id}`}
            >
              <span>{link?.icon}</span>
              <span className="hidden md:flex text-sm">{link?.title}</span>
            </Link>
          ))}
        </nav>

        <Button
          onClick={handleLogout}
          className="flex w-fit bg-black border-black gap-4 hover:border-black hover:text-black"
        >
          <FiLogOut />
          <span className="hidden md:flex">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
