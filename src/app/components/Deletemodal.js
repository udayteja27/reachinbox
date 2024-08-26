import { ClipLoader } from "react-spinners";
export default function Deletemodal({
  setshowdeletemodal,
  showdeletemodal,
  isDark,
  deleteEmail,
  isLoadingdelete,
  fetchEmails,
  selectedThreadId,
}) {
  return (
    <div
      className={`${
        showdeletemodal ? "block" : "hidden"
      } z-50 flex items-center justify-center bg-[#8484847D] absolute top-0 left-0 w-full h-full`}
    >
      {!isLoadingdelete ? (
        <div
          className="py-6 px-10 border rounded-lg flex flex-col items-center gap-10"
          style={{
            background: isDark
              ? "linear-gradient(180deg, #141517 0%, #232528 100%)"
              : "linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%)",
            borderImage: isDark
              ? "linear-gradient(180deg, #484E53 0%, #2F3338 100%) 1"
              : "linear-gradient(180deg, #CCCCCC 0%, #BBBBBB 100%) 1",
          }}
        >
          <h1 className={isDark ? "text-white text-xl" : "text-black text-xl"}>
            Are you sure?
          </h1>
          <span
            className={
              isDark ? "text-sm text-[#E8E8E8]" : "text-sm text-[#333]"
            }
          >
            Your selected email will be deleted.
          </span>
          <div className="flex items-center justify-between gap-10">
            <button
              className={`px-6 py-2 rounded ${
                isDark ? "text-white bg-[#25262B]" : "text-black bg-[#E0E0E0]"
              }`}
              onClick={() => setshowdeletemodal(false)}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                setshowdeletemodal(false);
                await deleteEmail(selectedThreadId);
                await fetchEmails();
              }}
              className="px-6 py-2 text-white rounded"
              style={{
                background: isDark
                  ? "linear-gradient(91.73deg, #FA5252 -2.99%, #A91919 5.8%)"
                  : "linear-gradient(91.73deg, #FF7979 -2.99%, #FF5252 5.8%)",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <ClipLoader size={35} color={isDark ? "#FFFFFF" : "#000000"} />
        </div>
      )}
    </div>
  );
}