
import { IoIosArrowDown } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function Listofemail({
  isDark,
  Emaillist,
  fetchEmails,
  fetchRefreshEmails,
  isLoadinglist,
  setIsLoadinglist,
  fetchMessages,
  setFocusedElement,

  selectedemail,
  setselectedemail,
  selectedThreadId,
  setSelectedThreadId,
}) {
  const [hidePlaceholder, setHidePlaceholder] = useState(false);
  const [filteredEmails, setFilteredEmails] = useState(Emaillist?.data || []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Newest");

  const options = ["Newest", "Older"];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (filteredEmails) {
      let sortedEmails = [...filteredEmails];

      if (option === "Newest") {
        sortedEmails.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
      } else {
        sortedEmails.reverse();
      }

      setFilteredEmails(sortedEmails);
    }
  };

  useEffect(() => {
    setFilteredEmails(Emaillist?.data || []);
  }, [Emaillist]);

  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const now = new Date();
    const timeDiff = now - dateObj;

    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDiff < oneDay && now.getDate() === dateObj.getDate()) {
      const hours = dateObj.getHours().toString().padStart(2, "0");
      const minutes = dateObj.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else {
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString("en-US", { month: "short" });
      return `${day} ${month}`;
    }
  }

  function newReplies(Emaillist) {
    if (Emaillist && Emaillist.data) {
      const unreadCount = Emaillist.data.filter(
        (email) => !email.isRead
      ).length;
      return unreadCount;
    }
  }

  const handleRefresh = async () => {
    await fetchRefreshEmails();
    await fetchEmails();
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setHidePlaceholder(searchQuery.length > 0);
    setIsLoadinglist(true);

    const filtered = Emaillist?.data.filter(
      (email) =>
        email.fromName.toLowerCase().includes(searchQuery) ||
        email.fromEmail.toLowerCase().includes(searchQuery)
    );
    setFilteredEmails(filtered || []);
    setIsLoadinglist(false);
  };
  const handlemessages = async (threadid, email, name) => {
    setselectedemail(true);
    setSelectedThreadId(threadid);
    await fetchMessages(threadid, email, name);
  };
  return (
    <section
      className={`${
        isDark ? "bg-black border-[#33383F]" : "bg-[#FAFAFA] border-[#E0E0E0]"
      } h-full px-6 py-4  border-r-2`}
    >
      <main className="flex flex-col h-full">
        <div className="flex flex-col mb-4 ">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex text-[#4285F4] text-2xl items-center">
                All Inbox(s)
                <IoIosArrowDown size={23} className="ml-2 cursor-pointer" />
              </div>
              <div
                className={`${
                  isDark ? "text-white" : "text-[#343A40]"
                } flex items-center text-sm`}
              >
                {Emaillist && Emaillist.data.length > 0
                  ? `${selectedemail ? 1 : 0} / ${Emaillist.data.length}`
                  : ""}
                <span className="text-[#7F7F7F] ml-2">Inboxes selected</span>
              </div>
            </div>
            <div
              onClick={handleRefresh}
              className={`${isDark ? "text-white" : "text-[#172B4D]"}`}
            >
              <TbReload
                size={30}
                className={`${
                  isDark
                    ? "bg-[#25262B]"
                    : "bg-transparent border border-[#DFE3E8]"
                } cursor-pointer rounded p-2`}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex relative mb-4">
              <input
                onChange={handleSearch}
                type="search"
                name="search"
                id="search"
                onFocus={() => setFocusedElement(false)}
                onBlur={() => setFocusedElement(true)}
                className={`${
                  isDark
                    ? "bg-[#23272C] border-[#FFFFFF1A] text-white"
                    : "bg-[#F4F6F8] border-[#DFE3E8] text-[#172B4D]"
                } outline-transparent focus:outline-none focus:ring-0 rounded  border py-1  px-2 w-full`}
              />
              <div className="flex items-center absolute top-1 left-1">
                <CiSearch
                  size={20}
                  className={`cursor-pointer ${
                    hidePlaceholder ? "hidden" : "block"
                  } ${
                    isDark
                      ? "text-white opacity-20"
                      : "text-[#172B4D] opacity-100"
                  } mr-1`}
                />
                <span
                  className={`${hidePlaceholder ? "hidden" : "block"} ${
                    isDark
                      ? "text-white opacity-20"
                      : "text-[#ADBAC7] opacity-100"
                  }`}
                >
                  search
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`${
                    isDark ? " bg-[#222426]" : "bg-[#ECECEC]"
                  } p-1 text-sm text-[#5C7CFA] px-2 mr-2  rounded-full`}
                >
                  {newReplies(Emaillist)}
                </div>
                <div
                  className={`${
                    isDark ? "text-white" : "text-[#172B4D]"
                  } text-sm`}
                >
                  New Replies
                </div>
              </div>
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center ${
                    isDark ? "text-white" : "text-[#172B4D]"
                  } text-sm rounded px-3 py-2 bg-transparent`}
                >
                  {selectedOption}
                  <IoIosArrowDown size={20} className="ml-2" />
                </button>
                {isOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-40  border rounded shadow-lg ${
                      isDark ? "text-white bg-black" : "text-[#172B4D] bg-white"
                    }`}
                  >
                    {options.map((option) => (
                      <div
                        key={option}
                        className={`px-4 py-2 cursor-pointer ${
                          isDark ? "hover:bg-[#23272C]" : "bg-gray-200"
                        }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full overflow-y-auto flex flex-col">
          {isLoadinglist ? (
            <div className="flex justify-center items-center h-full  w-full">
              <ClipLoader size={35} color={isDark ? "#FFFFFF" : "#000000"} />
            </div>
          ) : filteredEmails.length > 0 ? (
            filteredEmails.map((email, index) => (
              <div
                key={index}
                onClick={() =>
                  handlemessages(
                    email.threadId,
                    email.fromEmail,
                    email.fromName
                  )
                }
                className={`w-full py-3 cursor-pointer rounded border-y-2 border-[#FFFFFF0D] ${
                  selectedThreadId === email.threadId
                    ? "border-l-8 border-l-[#5C7CFA]"
                    : ""
                } ${
                  isDark
                    ? selectedThreadId === email.threadId
                      ? "bg-[#23272C]"
                      : "hover:bg-[#23272C]"
                    : selectedThreadId === email.threadId
                    ? "bg-[#E7F0FF]"
                    : "hover:bg-[#F5F7F9]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center mr-10">
                    <div
                      className={`p-1 h-1 w-1 ${
                        email.isRead ? "bg-transparent" : "bg-[#5C7CFA]"
                      } rounded-full mr-2`}
                    ></div>
                    <div className="flex flex-col">
                      <h2
                        className={`${
                          isDark ? "text-white" : "text-[#343A40]"
                        }`}
                      >
                        {email.fromEmail}
                      </h2>
                      <span
                        className={`text-[12px] truncate max-w-[150px] ${
                          isDark ? "text-[#cccaca]" : "text-[#172B4D]"
                        }`}
                      >
                        {email.subject}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-[14px] ${
                      isDark ? "text-[#FCFCFC66]" : "text-[#919EAB]"
                    }`}
                  >
                    {formatDate(email.sentAt)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <span
                className={`${
                  isDark ? "text-white" : "text-[#172B4D]"
                } text-sm`}
              >
                No email found
              </span>
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
