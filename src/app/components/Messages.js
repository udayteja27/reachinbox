
import { IoIosArrowDown } from "react-icons/io";
import {
  MdMarkunreadMailbox,
  MdEdit,
  MdPersonRemove,
  MdDeleteOutline,
  MdReply,
} from "react-icons/md";
import { LuClock } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import TextEditor from "./TextEditor";

export default function Messages({
  isDark,
  messagelist,
  setshowdeletemodal,
  isLoadingmessage,
  setshowreply,
  showreply,
  Emaillist,
  selectedThreadId,
  replyMessage,
  setFocusedElement,
}) {
  const [showemaildropdown, setshowemaildropdown] = useState(false);
  const dropdownRef = useRef(null);
  const handlereply = () => {
    if (Emaillist && Emaillist.data.length > 0) {
      const emailExists = Emaillist.data.some(
        (email) => email.threadId === selectedThreadId
      );

      if (emailExists) {
        setshowreply(true);
      }
    }
  };
  useEffect(() => {
    setshowreply(false);
  }, [selectedThreadId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setshowemaildropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (messagelist) {
    function formatDate(dateStr) {
      const dateObj = new Date(dateStr);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const oneDay = 24 * 60 * 60 * 1000;
      if (dateObj >= today && dateObj < today.getTime() + oneDay) {
        return "Today";
      }
      if (dateObj >= yesterday && dateObj < today) {
        return "Yesterday";
      }
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString("en-US", { month: "short" });
      const year = dateObj.getFullYear();
      return `${day} ${month} ${year}`;
    }

    function formatCustomDate(dateStr) {
      const dateObj = new Date(dateStr);
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString("en-US", { month: "long" });
      const year = dateObj.getFullYear();
      let hours = dateObj.getHours();
      const minutes = dateObj.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${day} ${month} ${year} : ${hours}:${minutes}${ampm}`;
    }
    const handleemailoptions = (e) => {
      setshowemaildropdown(!showemaildropdown);
    };
    const handledeletemodal = () => {
      setshowdeletemodal(true);
      setshowemaildropdown(false);
    };

    return (
      <div
        className={`w-full h-full flex justify-center ${
          isDark ? "bg-black" : "bg-white"
        } relative`}
      >
        <div className="flex flex-col h-full w-full pb-4">
          <div
            className={`flex border-b-2 ${
              isDark ? " border-[#F8FAFC33]" : "border-[#E0E0E0]"
            } items-center justify-between px-6 py-4`}
          >
            <div className="flex flex-col">
              <h1
                className={`${
                  isDark ? "text-white" : "text-[#343A40]"
                } text-xl`}
              >
                {messagelist.name}
              </h1>

              <span
                className={`${
                  isDark ? "text-[#FFFFFF66]" : "text-[#343A40B2]"
                } text-sm`}
              >
                {messagelist.email}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`flex items-center border ${
                  isDark
                    ? "bg-[#1F1F1F] border-[#343A40]"
                    : "bg-white border-[#DFE3E8]"
                } mr-4 rounded gap-2 p-1`}
              >
                <div className="w-3 h-3 rounded-full bg-[#E6D162]"></div>
                <span
                  className={`${isDark ? "text-[#D3D7DB]" : "text-[#172B4D]"}`}
                >
                  Meeting Completed
                </span>
                <IoIosArrowDown
                  size={23}
                  className={`ml-2 cursor-pointer ${
                    isDark ? "text-[#A9AEB4]" : "text-[#172B4D]"
                  }`}
                />
              </button>
              <button
                className={` border ${
                  isDark
                    ? "bg-[#1F1F1F] border-[#343A40]"
                    : "bg-white border-[#DFE3E8]"
                }  rounded mr-4 p-1 flex items-center`}
              >
                <span
                  className={`${isDark ? "text-[#D3D7DB]" : "text-[#172B4D]"}`}
                >
                  Move
                </span>
                <IoIosArrowDown
                  size={23}
                  className={`ml-2 cursor-pointer ${
                    isDark ? "text-[#A9AEB4]" : "text-[#172B4D]"
                  }`}
                />
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={(e) => handleemailoptions(e)}
                  className={` border  rounded ${
                    isDark
                      ? "bg-[#1F1F1F] text-[#D3D7DB] border-[#343A40]"
                      : "bg-white border-[#DFE3E8] text-[#172B4D]"
                  } p-1 flex items-center`}
                >
                  ...
                </button>
                <div
                  className={`${
                    showemaildropdown ? "block" : "hidden"
                  } absolute top-12 py-2 -left-44 rounded z-50 borfer ${
                    isDark
                      ? "bg-[#1E1F22] border-[#343A40]"
                      : "bg-white border-[#DFE3E8] drop-shadow"
                  }`}
                >
                  <li
                    className={`flex cursor-pointer ${
                      isDark
                        ? "text-[#D3D7DB] hover:bg-[#2F3030]"
                        : "text-[text-[#919EAB]] hover:bg-[#E9EAEB]"
                    } py-2 px-4`}
                  >
                    <MdMarkunreadMailbox
                      size={20}
                      className={`${
                        isDark ? "text-[#EBEBEB]" : "text-[#343a40c7]"
                      } mr-4`}
                    />
                    Mark as unread
                  </li>

                  <li
                    className={`flex cursor-pointer ${
                      isDark
                        ? "text-[#D3D7DB] hover:bg-[#2F3030]"
                        : "text-[text-[#919EAB]] hover:bg-[#E9EAEB]"
                    } py-2 px-4`}
                  >
                    <MdEdit
                      size={20}
                      className={`${
                        isDark ? "text-[#EBEBEB]" : "text-[#343a40c7]"
                      } mr-4`}
                    />
                    Edit lead
                  </li>

                  <li
                    className={`flex cursor-pointer ${
                      isDark
                        ? "text-[#D3D7DB] hover:bg-[#2F3030]"
                        : "text-[text-[#919EAB]] hover:bg-[#E9EAEB]"
                    } py-2 px-4`}
                  >
                    <MdPersonRemove
                      size={20}
                      className={`${
                        isDark ? "text-[#EBEBEB]" : "text-[#343a40c7]"
                      } mr-4`}
                    />
                    Remove lead
                  </li>

                  <li
                    className={`flex cursor-pointer ${
                      isDark
                        ? "text-[#D3D7DB] hover:bg-[#2F3030]"
                        : "text-[text-[#919EAB]] hover:bg-[#E9EAEB]"
                    } py-2 px-4`}
                  >
                    <LuClock
                      size={20}
                      className={`${
                        isDark ? "text-[#EBEBEB]" : "text-[#343a40c7]"
                      } mr-4`}
                    />
                    Set reminder
                  </li>

                  <li
                    onClick={handledeletemodal}
                    className={`flex cursor-pointer ${
                      isDark
                        ? "text-[#D3D7DB] hover:bg-[#2F3030]"
                        : "text-[text-[#919EAB]] hover:bg-[#E9EAEB]"
                    } py-2 px-4`}
                  >
                    <MdDeleteOutline
                      size={20}
                      className={`${
                        isDark ? "text-[#EBEBEB]" : "text-[#343a40c7]"
                      } mr-4`}
                    />
                    Delete
                  </li>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col w-full h-[60vh] px-6 overflow-y-auto pt-4  ${
              isDark ? "bg-black" : "bg-[#EEF1F4]"
            }`}
          >
            {isLoadingmessage ? (
              <div className="flex justify-center items-center h-full w-full">
                <ClipLoader size={35} color={isDark ? "#FFFFFF" : "#000000"} />
              </div>
            ) : (
              messagelist.data.map((message, index) => (
                <div key={index} className="flex flex-col gap-4 p-4">
                  <div
                    className={`border mb-2 ${
                      isDark ? "border-[#F8FAFC33]" : "border-[#77777733]"
                    } relative`}
                  >
                    <div
                      className={`${
                        isDark
                          ? "bg-[#171819] text-white"
                          : "bg-[#EEF1F4] text-[#637381]"
                      } text-sm absolute -top-4 left-1/2 -translate-x-1/2 px-2 py-1 rounded`}
                    >
                      {formatDate(message.sentAt)}
                    </div>
                  </div>
                  <div
                    className={`flex flex-col gap-7 drop-shadow px-4 py-3 rounded border  ${
                      isDark
                        ? "bg-[#141517] border-[#343A40]"
                        : "bg-[#F9F9F9] border-[#E0E0E0]"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h2
                          className={`text-xl ${
                            isDark ? "text-[#F8FAFC]" : "text-black"
                          }`}
                        >
                          {message.subject}
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-sm ${
                              isDark ? "text-[#AEAEAE]" : "text-[#637381]"
                            }`}
                          >
                            from :{message.fromEmail}
                          </span>
                          <span
                            className={`text-sm ${
                              isDark ? "text-[#AEAEAE]" : "text-[#637381]"
                            }`}
                          >
                            cc :{message.cc ? message.cc : ""}
                          </span>
                        </div>
                        <div
                          className={`text-sm mt-2 ${
                            isDark ? "text-[#AEAEAE]" : "text-[#637381]"
                          }`}
                        >
                          to :{message.toEmail}
                        </div>
                      </div>
                      <div
                        className={`${
                          isDark ? "text-[#7F7F7F]" : "text-[#637381]"
                        }`}
                      >
                        {formatCustomDate(message.sentAt)}
                      </div>
                    </div>
                    <div
                      className={`${
                        isDark ? "text-[#E1E0E0]" : "text-[#172B4D]"
                      }`}
                      dangerouslySetInnerHTML={{ __html: message.body }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
          {!isLoadingmessage ? (
            <div
              className={`${
                showreply ? "hidden" : "block"
              } mt-4 cursor-pointer self-start ml-6 z-10`}
            >
              <button
                onClick={handlereply}
                className="rounded flex text-white items-center text-lg px-6 py-2 bg-gradient-to-r from-[#4B63DD] to-[#0524BF]"
              >
                <MdReply size={25} className="text-[#F6F6F6] mr-2" />
                Reply
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="absolute bottom-5 left-10 w-[90%] h-[70vh]">
          <TextEditor
            isDark={isDark}
            showreply={showreply}
            setshowreply={setshowreply}
            Emaillist={Emaillist}
            replyMessage={replyMessage}
            selectedThreadId={selectedThreadId}
            setFocusedElement={setFocusedElement}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`h-full w-full flex items-center justify-center ${
          isDark ? "bg-black text-[#E1E0E0]" : "bg-white text-text-[#172B4D]"
        }`}
      >
        click on Email to see Messages
      </div>
    );
  }
}
