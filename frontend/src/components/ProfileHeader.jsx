import React from "react";
import { Radio, BellOff, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const AVATAR_GRADIENT = {
  amber: "from-amber-200 to-amber-600",
  fuchsia: "from-fuchsia-200 to-fuchsia-600",
  sky: "from-sky-200 to-sky-600",
  rose: "from-rose-200 to-rose-600",
};

function Avatar({ initials, accent, size, status }) {
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

export const ProfileHeader = () => {

  const {authUser} = useAuthStore()
  
  return (
    <div className="flex items-center gap-3 px-5 pt-5 pb-4">
      <Avatar initials={authUser.user.name.substr(0,2)} accent="sky" size="lg" status="online" />
      <div className="min-w-0 flex-1">
        <div
          className="text-base font-semibold"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {authUser.user.name}
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
          <Radio size={10} strokeWidth={2.5} /> Connected
        </div>
      </div>
      <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white">
        <BellOff size={16} />
      </button>
      <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white">
        <LogOut size={16} />
      </button>
    </div>
  );
};

export default ProfileHeader;
