
"use client";
import home from "../../../public/home.png";
import Image from "next/image";
export default function Homepage() {
  return (
    <div className="w-full bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Image src={home} alt="Home" />
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-white mb-3 text-xl">
            It’s the beginning of a legendary sales pipeline{" "}
          </h1>
          <p className="text-[#9E9E9E] text-sm  max-w-56 text-center">
            When you have inbound E-mails you’ll see them here
          </p>
        </div>
      </div>
    </div>
  );
}
