import React from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const mouseClickSound = new Audio("/sound/mouseClick.mp3");

const AVATAR_GRADIENT = [
   "from-amber-200 to-amber-600",
   "from-fuchsia-200 to-fuchsia-600",
  "from-sky-200 to-sky-600",
  "from-rose-200 to-rose-600",
];

function Avatar({ initials, status, number }) {
let i = number % 3
  return (
    <div className="relative shrink-0">
      <div
        className={`w-11 h-11 text-sm uppercase rounded-full flex items-center justify-center font-semibold text-slate-900 bg-gradient-to-br ${AVATAR_GRADIENT[i]} shadow-lg shadow-black/30 ring-1 ring-white/10`}
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

const HeaderChatSection = () => {
  const { selectedUser, setSelectedUser, isSoundEnabled } = UseChatStore();
  const {onlineUsers} = useAuthStore()

  const RemoveSelectedUser = (e) => {
    e.preventDefault();
    if (isSoundEnabled) {
      mouseClickSound.currentTime = 0;
      mouseClickSound.play().catch((e) => console.log(e));
    }
    setSelectedUser(null);
    // console.log(selectedUser);
  };
  return (
    <div className="flex flex-shrink-0 items-center gap-3 border-b border-white/10 px-6 py-4">
      <button
        onClick={RemoveSelectedUser}
        className="grid h-8 w-8 place-items-center cursor-pointer rounded-lg text-slate-400 hover:bg-white/10 hover:text-white "
      >
        <ArrowLeft size={17} />
      </button>

      {selectedUser.profileImg === "" ? (
        <Avatar initials={selectedUser.name.substr(0, 2)} status={onlineUsers.includes(selectedUser._id) ? "online" : "ofline"} number={selectedUser.createdAt.slice(17, 19)}/>
      ) : (
        <div className= {`avatar cursor-pointer ${
              onlineUsers.includes(selectedUser._id) ? "avatar-online": null
            }`}>
          <div className="w-11 rounded-full">
            <img src={`${selectedUser.profileImg}`} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div
          className="text-[15px] font-semibold"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {selectedUser.name}
        </div>
        <div className="mt-0.5 text-xs text-slate-400"></div>
      </div>
      <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white">
        <MoreVertical size={17} />
      </button>
    </div>
  );
};

export default HeaderChatSection;
