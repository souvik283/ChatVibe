import React from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const AVATAR_GRADIENT = {
  amber: "from-amber-200 to-amber-600",
  fuchsia: "from-fuchsia-200 to-fuchsia-600",
  sky: "from-sky-200 to-sky-600",
  rose: "from-rose-200 to-rose-600",
};

function Avatar({ initials }) {
  const accent = "fuchsia";
  const status = "ofline";
  return (
    <div className="relative shrink-0">
      <div
        className={`w-11 h-11 text-sm uppercase rounded-full flex items-center justify-center font-semibold text-slate-900 bg-gradient-to-br ${AVATAR_GRADIENT[accent]} shadow-lg shadow-black/30 ring-1 ring-white/10`}
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {initials}
      </div>
      {status === "online" && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
      )}
    </div>
  );
}

const HeaderChatSection = () => {
  const { selectedUser, setSelectedUser } = UseChatStore();

  const RemoveSelectedUser = (e) => {
    e.preventDefault();
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
        <Avatar initials={selectedUser.name.substr(0, 2)} />
      ) : (
        <div className="avatar avatar-ofline cursor-pointer">
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
        <div className="mt-0.5 text-xs text-slate-400">{"12:34"}</div>
      </div>
      <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white">
        <MoreVertical size={17} />
      </button>
    </div>
  );
};

export default HeaderChatSection;
