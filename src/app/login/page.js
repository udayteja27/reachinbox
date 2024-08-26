
"use client";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

function Loginpage() {
  const [isAuthenticatelogin, setisAuthenticatelogin] = useState(null);
  const [isDark, setisDark] = useState(true);
  const router = useRouter();
  const spinnerStyle = {
    borderWidth: "5px",
  };

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setisAuthenticatelogin(!!authToken);
  }, []);

  useEffect(() => {
    if (isAuthenticatelogin === true) {
      router.push("/inbox");
    }
  }, [isAuthenticatelogin, router]);

  const handlelogin = () => {
    window.location.href =
      "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=https://reachinbox-assignment-sigma.vercel.app/inbox";
  };

  if (isAuthenticatelogin === null) {
    return (
      <div className="flex justify-center items-center h-full w-full bg-[#1F1F1F]">
        <ClipLoader size={35} color="#4285F4" cssOverride={spinnerStyle} />
      </div>
    );
  }

  if (!isAuthenticatelogin) {
    return (
      <div className="h-full w-full flex flex-col">
        <nav className="flex items-center justify-center bg-black border border-[#25262B] w-full h-12">
          <Image src={logo} alt="logo" />
        </nav>
        <section className="bg-black flex justify-center items-center px-4 h-full">
          <div className="bg-[linear-gradient(138.97deg,#111214_5.16%,#121212_105.18%)] rounded-lg px-6 w-96 py-4 border border-[#25262B]">
            <div className="flex flex-col items-center mb-14">
              <h2 className="text-white mb-6 text-2xl">Create a new account</h2>
              <button
                onClick={handlelogin}
                className="flex items-center border border-[#707172] text-[#CCCCCC] w-full py-4 justify-center rounded"
              >
                <FcGoogle size={20} className="mr-2" /> Sign Up with Google
              </button>
            </div>
            <div className="flex flex-col items-center ">
              <button className="text-white mb-8 py-3 px-8 rounded bg-[linear-gradient(91.73deg,_#4B63DD_2.99%,_rgba(5,_36,_191,_0.99)_95.8%)]">
                Create an Account
              </button>

              <span className="text-[#909296]">
                Already have an account?{" "}
                <span className="text-white text-sm">Sign in</span>
              </span>
            </div>
          </div>
        </section>

        <footer className="text-[#5C5F66] bg-[#25262B] text-center text-sm py-1">
          © 2023 Reachinbox. All rights reserved.{" "}
        </footer>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-full w-full bg-[#1F1F1F]">
        <ClipLoader size={50} color="#4285F4" cssOverride={spinnerStyle} />
      </div>
    );
  }
}

export default Loginpage;
