import React, { useEffect } from "react";
import { useState } from "react";
import { UseChatStore } from "../store/useChatStore";
import { MessageCircleMore } from "lucide-react";
import SearchChatsBar from "./SearchChatsBar";
import LoadingContacts from "../components/LoadingContacts";
import { useAuthStore } from "../store/useAuthStore";

const mouseClickSound = new Audio("/sound/mouseClick.mp3");

const AVATAR_GRADIENT = [
  "from-amber-200 to-amber-600",
  "from-fuchsia-200 to-fuchsia-600",
  "from-sky-200 to-sky-600",
  "from-rose-200 to-rose-600",
];

function Avatar({ initials, status, number }) {
  let i = number % 3;
  return (
    <div className="relative shrink-0">
      <div
        className={`w-10 h-10 text-sm uppercase rounded-full flex items-center justify-center font-semibold text-slate-900 bg-gradient-to-br ${AVATAR_GRADIENT[i]} shadow-lg shadow-black/30 ring-1 ring-white/10`}
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {initials}
      </div>
      {status === "online" && (
        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
      )}
    </div>
  );
}

const GetAllContacts = () => {
  const [activeId, setActiveId] = useState(null);

  const {
    setActiveTab,
    isLoadingUsers,
    getChattingContacts,
    setSelectedUser,
    getChatsOfUser,
    isSoundEnabled,
    searchAllContacts
  } = UseChatStore();

//   useEffect(() => {
// console.log(searchContacts);

//   },[searchContacts])

  const { onlineUsers } = useAuthStore();

  const handleAllchats = async (e) => {
    e.preventDefault();
    if (isSoundEnabled) {
      mouseClickSound.currentTime = 0;
      mouseClickSound.play().catch((e) => console.log(e));
    }
    await getChattingContacts();
    await setActiveTab("chats");
  };

  if (isLoadingUsers) {
    return <LoadingContacts />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-2.5 pb-4">
      <button
        className=" absolute left-5 top-21 rounded-xl bg-linear-to-r from-purple-400 to-purple-700 p-2 cursor-pointer"
        onClick={handleAllchats}
      >
        <MessageCircleMore
          size={27}
          color="#e6e6e6"
          className="cursor-pointer"
        />
      </button>

      <SearchChatsBar />

      {searchAllContacts.map((c) => (
        <div
          key={c._id}
          onClick={() => {
            if (isSoundEnabled) {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((e) => console.log(e));
            }
            setActiveId(c._id);
            setSelectedUser(c);
            getChatsOfUser(c._id);
          }}
          className={`mb-0.5 flex cursor-pointer items-center gap-3 rounded-2xl px-2.5 py-2.5 transition ${
            activeId === c._id
              ? "bg-gradient-to-r from-amber-400/15 to-amber-400/0 shadow-[inset_2px_0_0_0_rgb(251,191,36)]"
              : "hover:bg-white/5"
          }`}
        >
          {c.profileImg == "" ? (
            <Avatar
              initials={c.name.substr(0, 2)}
              status={onlineUsers.includes(c._id) ? "online" : "ofline"}
              number={c.createdAt.slice(17, 19)}
            />
          ) : (
            <div
              className={`avatar cursor-pointer ${
                onlineUsers.includes(c._id) ? "avatar-online" : null
              }`}
            >
              <div className="w-10 rounded-full">
                <img src={`${c.profileImg}`} />
              </div>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-1.5">
              <span className="truncate text-sm font-semibold">{c.name}</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between gap-1.5">
              <span className="truncate text-xs text-slate-400">
                {c.preview}
              </span>
              {/* {c.unread > 0 && (
                        <span className="grid h-[18px] min-w-[18px] shrink-0 place-items-center rounded-full bg-amber-400 px-1 text-[10.5px] font-bold text-slate-900">
                          {c.unread}
                        </span>
                      )} */}
            </div>
          </div>
        </div>
      ))}
      {searchAllContacts.length === 0 && (
                <div className="px-2.5 py-6 text-center text-sm text-slate-500">
                  No one matches 
                </div>
              )}
    </div>
  );
};

export default GetAllContacts;
