
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

export default function Navbar({ isDark, setisDark }) {
  const handletoggle = () => {
    setisDark(!isDark);
  };
  return (
    <div
      className={`flex items-center justify-center ${
        isDark
          ? "bg-[#1F1F1F] border-b-2 border-[#343A40]"
          : "bg-white border-b-2 border-[#DEDEDE]"
      }  w-full self-start`}
    >
      <div className="w-full flex justify-between px-8 py-3 items-center">
        <h1 className={`${isDark ? "text-white" : "text-[#454F5B]"} text-xl`}>
          Onebox
        </h1>
        <div className="flex items-center">
          <div
            onClick={handletoggle}
            className={`relative flex items-center justify-between rounded-full py-1 px-1 cursor-pointer mr-6 border-2 w-20 ${
              isDark
                ? "transparent border-[#343A40]"
                : "bg-[#E9EAEC] border-[#DEDEDE]"
            } `}
          >
            <div>
              <IoMoonOutline className="text-amber-500" size={18} />
            </div>
            <div>
              <IoSunnyOutline className="text-amber-500" size={20} />
            </div>
            <div
              className={`absolute top-[1px] ${
                isDark ? "left-1 bg-[#888686]" : "left-12 bg-white"
              } w-6 h-6 rounded-full  transition-all duration-300 ease-in-out`}
            ></div>
          </div>
          <div
            className={`flex ${
              isDark ? "text-white" : "text-[#454F5B]"
            } items-center text-sm`}
          >
            Tejesh&apos;s Workspace
            <IoIosArrowDown size={20} className="ml-2 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
