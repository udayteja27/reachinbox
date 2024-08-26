"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Listofemail from "../components/Listofemail";
import Messages from "../components/Messages";
import Homepage from "../components/Homepage";
import Deletemodal from "../components/Deletemodal";
import { ClipLoader } from "react-spinners";

function Inboxpage() {
  const params = useSearchParams();
  const [isDark, setisDark] = useState(true);
  const [Emaillist, setEmaillist] = useState(null);
  const [messagelist, setmessagelist] = useState(null);
  const [selectedemail, setselectedemail] = useState(false);
  const [showdeletemodal, setshowdeletemodal] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [isAuthenticatestatus, setisAuthenticatestatus] = useState(null);
  const router = useRouter();
  const [isLoadinglist, setIsLoadinglist] = useState(false);
  const [isLoadingmessage, setIsLoadingmessage] = useState(false);
  const [isLoadingdelete, setIsLoadingdelete] = useState(false);
  const [showreply, setshowreply] = useState(false);
  const [focusedElement, setFocusedElement] = useState(true);
  const spinnerStyle = {
    borderWidth: "5px",
  };

  useEffect(() => {
    const tokenFromQuery = params.get("token");
    if (tokenFromQuery) {
      Cookies.set("authToken", tokenFromQuery);
      setisAuthenticatestatus(true);
    }
  }, [params]);
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setisAuthenticatestatus(!!authToken);
  }, []);

  useEffect(() => {
    if (isAuthenticatestatus === false) {
      router.push("/login");
    }
  }, [isAuthenticatestatus, router]);
  const fetchEmails = async () => {
    try {
      const authToken = Cookies.get("authToken");
      setIsLoadinglist(true);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(
        "https://hiring.reachinbox.xyz/api/v1/onebox/list",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      const latestEmailsMap = res.data.sort(
        (a, b) => new Date(b.sentAt) - new Date(a.sentAt)
      );
      setEmaillist((prevState) => ({
        ...prevState,
        data: latestEmailsMap,
      }));
      setIsLoadinglist(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setIsLoadinglist(false);
    }
  };
  const fetchRefreshEmails = async () => {
    try {
      const authToken = Cookies.get("authToken");
      setIsLoadinglist(true);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(
        "https://hiring.reachinbox.xyz/api/v1/onebox/reset",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      alert(res.data);
      setmessagelist(null);
      setselectedemail(false);
      setshowreply(false);

      setIsLoadinglist(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setIsLoadinglist(false);
    }
  };
  const fetchMessages = async (threadid, email, name) => {
    try {
      const authToken = Cookies.get("authToken");
      setIsLoadingmessage(true);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadid}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      setmessagelist({ email: email, name: name, ...res });
      setIsLoadingmessage(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setIsLoadingmessage(false);
    }
  };
  const deleteEmail = async (threadid) => {
    try {
      const authToken = Cookies.get("authToken");
      setIsLoadingdelete(true);

      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadid}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      alert(res.message);
      setmessagelist(null);
      setselectedemail(false);
      setIsLoadingdelete(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setIsLoadingdelete(false);
    }
  };
  const replyMessage = async (threadid, body) => {
    try {
      const authToken = Cookies.get("authToken");
      setIsLoadingdelete(true);

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(body), // Convert the body to a JSON string
        redirect: "follow",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadid}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      //alert(res.message);
      //setmessagelist(null);
      //setselectedemail(false);
      //setIsLoadingdelete(false);
      console.log(res);
    } catch (error) {
      console.error("Error fetching emails:", error);
      //setIsLoadingdelete(false);
    }
  };
  useEffect(() => {
    fetchEmails();
  }, []);
  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.key === "d" || event.key === "D") {
        if (selectedThreadId) {
          if (focusedElement) {
            setshowdeletemodal(false);
            await deleteEmail(selectedThreadId);
            await fetchEmails();
            setSelectedThreadId(null);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedThreadId, focusedElement]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "r" || event.key === "R") {
        setshowreply(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (isAuthenticatestatus === false) {
      router.push("/login");
    }
  }, [isAuthenticatestatus, router]);

  if (isAuthenticatestatus === null) {
    return (
      <div className="flex justify-center items-center h-full w-full bg-[#1F1F1F]">
        <ClipLoader size={50} color="#4285F4" cssOverride={spinnerStyle} />
      </div>
    );
  }

  if (isAuthenticatestatus) {
    return (
      <div className="flex h-full">
        <Deletemodal
          setshowdeletemodal={setshowdeletemodal}
          showdeletemodal={showdeletemodal}
          isDark={isDark}
          selectedThreadId={selectedThreadId}
          deleteEmail={deleteEmail}
          fetchEmails={fetchEmails}
          isLoadingdelete={isLoadingdelete}
        />
        <Sidebar isDark={isDark} />

        {Emaillist && Emaillist.data.length > 0 ? (
          <div className="flex flex-col w-full">
            <Navbar isDark={isDark} setisDark={setisDark} />
            <div className="flex h-full w-full">
              <Listofemail
                isDark={isDark}
                Emaillist={Emaillist}
                fetchRefreshEmails={fetchRefreshEmails}
                fetchEmails={fetchEmails}
                fetchMessages={fetchMessages}
                setFocusedElement={setFocusedElement}
                setEmaillist={setEmaillist}
                isLoadinglist={isLoadinglist}
                setIsLoadinglist={setIsLoadinglist}
                setselectedemail={setselectedemail}
                selectedemail={selectedemail}
                setSelectedThreadId={setSelectedThreadId}
                selectedThreadId={selectedThreadId}
              />
              <Messages
                Emaillist={Emaillist}
                selectedThreadId={selectedThreadId}
                isDark={isDark}
                messagelist={messagelist}
                setFocusedElement={setFocusedElement}
                setshowdeletemodal={setshowdeletemodal}
                setshowreply={setshowreply}
                showreply={showreply}
                isLoadingmessage={isLoadingmessage}
                replyMessage={replyMessage}
              />
            </div>
          </div>
        ) : (
          <Homepage />
        )}
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

export default function Inbox() {
  return (
    <Suspense>
      <Inboxpage />
    </Suspense>
  );
}