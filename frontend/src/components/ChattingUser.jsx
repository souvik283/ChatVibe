import React, { useState } from "react";
import { UseChatStore } from "../store/useChatStore";
import { MessageCircle } from "lucide-react";
import LoadingContacts from "./LoadingContacts";

const AVATAR_GRADIENT = {
  amber: "from-amber-200 to-amber-600",
  fuchsia: "from-fuchsia-200 to-fuchsia-600",
  sky: "from-sky-200 to-sky-600",
  rose: "from-rose-200 to-rose-600",
};

function Avatar({ initials }) {
  const accent = "amber";
  const size = "";
  const status = "ofline";
  const dim =
    size === "sm"
      ? "w-9 h-9 text-xs"
      : size === "lg"
        ? "w-11 h-11 text-sm"
        : "w-10 h-10 text-sm";
  return (
    <div className="relative shrink-0">
      <div
        className={`${dim} uppercase rounded-full flex items-center justify-center font-semibold text-slate-900 bg-gradient-to-br ${AVATAR_GRADIENT[accent]} shadow-lg shadow-black/30 ring-1 ring-white/10`}
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

const ChattingUser = () => {
  const [activeId, setActiveId] = useState();
  const { chatContacts, setSelectedUser, getChatsOfUser, isLoadingUsers } =
    UseChatStore();
  // console.log(chatContacts);

  if (isLoadingUsers) {
    return <LoadingContacts />;
  }

  if (chatContacts.length == 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-7 h-20 w-20">
          <MessageCircle
            size={50}
            className=" absolute left-3 top-7  animate-pulse"
          />
        </div>
        <h2
          className="mb-2 text-xl font-semibold"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          No Conversation Yet
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-slate-400">
          Start a new chat by selecting a new contacts from the contact tab
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2.5 pb-4">
      {chatContacts.map((c) => (
        <div
          key={c._id}
          onClick={() => {
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
            <Avatar initials={c.name.substr(0, 2)} accent />
          ) : (
            <div className="avatar avatar-ofline cursor-pointer">
              <div className="w-10 rounded-full">
                <img src={`${c.profileImg}`} />
              </div>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-1.5">
              <span className="truncate text-sm font-semibold">{c.name}</span>
              <span className="shrink-0 text-[11px] text-slate-500">
                {c.time}
              </span>
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
      {/* {filtered.length === 0 && (
              <div className="px-2.5 py-6 text-center text-sm text-slate-500">No one matches "{query}"</div>
            )} */}
    </div>
  );
};

export default ChattingUser;
