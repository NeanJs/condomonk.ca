import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full min-h-[10vh] flex items-center justify-center shadow-lg">
      <div className="w-[95%] h-full flex items-center bg-white justify-between">
        <div className="logo-container flex gap-4 items-center">
          <Link href="/" className=" text-xl">
            <img
              src="/condomonk-bg.png"
              alt="canada mapel leaf"
              className="w-40 object"
            />
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/blogs">Blogs</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}
