import icon1 from "../../../public/mailicondark.png";
import icon2 from "../../../public/mailiconlight.png";
import Image from "next/image";
import { TbHomeFilled } from "react-icons/tb";
import { MdPersonSearch, MdViewList } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaTelegramPlane, FaInbox } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";

export default function Sidebar({ isDark }) {
  return (
    <div
      className={`border-r-2 ${
        isDark
          ? "bg-[#101113] border-[#343A40]"
          : "bg-[#FAFAFA] border-[#D8D8D8]"
      }    py-4 px-1 h-full flex items-center`}
    >
      <aside className="h-full flex flex-col items-center">
        <div className="mb-14">
          <Image src={isDark ? icon1 : icon2} alt="icon1" />
        </div>

        <div className="flex flex-col justify-between items-center h-full">
          <nav className="h-3/4 ">
            <ul className="flex h-full flex-col justify-between items-center">
              <li className=" list-none">
                <TbHomeFilled
                  className={`text-[#919EAB] ${
                    isDark
                      ? " hover:text-white hover:bg-[#2F3030]"
                      : " hover:text-[#595A5B] hover:bg-[#E9EAEB]"
                  } cursor-pointer p-1 rounded`}
                  size={30}
                />
              </li>
              <li className="list-none">
                <MdPersonSearch
                  className={`text-[#919EAB] ${
                    isDark
                      ? " hover:text-white hover:bg-[#2F3030]"
                      : " hover:text-[#595A5B] hover:bg-[#E9EAEB]"
                  } cursor-pointer p-1 rounded`}
                  size={30}
                />
              </li>
              <li className="list-none">
                <IoMdMail
                  className={`text-[#919EAB] ${
                    isDark
                      ? " hover:text-white hover:bg-[#2F3030]"
                      : " hover:text-[#595A5B] hover:bg-[#E9EAEB]"
                  } cursor-pointer p-1 rounded`}
                  size={30}
                />
              </li>
              <li className="list-none">
                <FaTelegramPlane
                  className={`text-[#919EAB] ${
                    isDark
                      ? " hover:text-white hover:bg-[#2F3030]"
                      : " hover:text-[#595A5B] hover:bg-[#E9EAEB]"
                  } cursor-pointer p-1 rounded`}
                  size={30}
                />
              </li>
              <li className="list-none">
                <MdViewList
                  className={`text-[#919EAB] ${
                    isDark
                      ? " hover:text-white hover:bg-[#2F3030]"
                      : " hover:text-[#595A5B] hover:bg-[#E9EAEB]"
                  } cursor-pointer p-1 rounded`}
                  size={30}
                />
              </li>
              <li className="list-none">
                <FaInbox
                  className={`text-[#919EAB] ${
                    isDark
                      ? " text-white bg-[#2F3030]"
                      : " text-[#595A5B] bg-[#E9EAEB]"
                  } cursor-pointer p-1 rounded`}
                  size={30}
                />
              </li>
              <li className="list-none">
                <RiBarChart2Fill
                  className={`text-[#919EAB] ${
                    isDark
                      ? " hover:text-white hover:bg-[#2F3030]"
                      : " hover:text-[#595A5B] hover:bg-[#E9EAEB]"
                  } cursor-pointer p-1 rounded`}
                  size={30}
                />
              </li>
            </ul>
          </nav>

          <div>
            <div className="text-white rounded-full bg-green-900 text-sm px-3 py-2 cursor-pointer">
              TR
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}