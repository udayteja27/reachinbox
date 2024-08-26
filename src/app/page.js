"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();
  const spinnerStyle = {
    borderWidth: "5px",
  };

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-full w-full bg-[#1F1F1F]">
      <ClipLoader size={35} color="#4285F4" cssOverride={spinnerStyle} />
    </div>
  );
}