import React, { useEffect, useRef, useState } from "react";
import {
  Radio,
  BellOff,
  LogOut,
  SquarePen,
  Bell,
  Upload,
  UserPen,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { UseChatStore } from "../store/useChatStore";
import Swal from "sweetalert2";
import "sweetalert2/themes/bulma.css";

const mouseClickSound = new Audio("/sound/mouseClick.mp3");

function Avatar({ initials, fileInputRef }) {
  return (
    <div className="relative shrink-0">
      <div
        className={`w-11 h-11 text-sm uppercase cursor-pointer rounded-full flex items-center justify-center font-semibold text-slate-900 bg-gradient-to-br from-sky-200 to-sky-600 shadow-lg shadow-black/30 ring-1 ring-white/10`}
        style={{ fontFamily: "'Fraunces', serif" }}
        onClick={() => fileInputRef.current.click()}
      >
        {initials}
      </div>

      <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
    </div>
  );
}

export const ProfileHeader = () => {
  const [opacity, setOpacity] = useState(0);
  const { authUser, uploadProfileImg, logout, updateName } = useAuthStore();
  const { toggleSound, isSoundEnabled } = UseChatStore();
  const [image, setImage] = useState("");
  const [name, setName] = useState(authUser.user.name);

  useEffect(() => {}, [authUser]);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64Url = reader.result;
      setImage(base64Url);
      uploadProfileImg(base64Url);
    };
  };

  const handleLogout = async () => {
    if (isSoundEnabled) {
      mouseClickSound.currentTime = 0;
      mouseClickSound.play().catch((e) => console.log(e));
    }
    const result = await Swal.fire({
      title: "Logout?",
      theme: "dark",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });
    if (result.isConfirmed) {
      logout();
    }
  };

  const handleChangeName = async () => {
    if (isSoundEnabled) {
      mouseClickSound.currentTime = 0;
      mouseClickSound.play().catch((e) => console.log(e));
    }
    const { value: name } = await Swal.fire({
      title: "Enter Your new name",
      theme: "dark",
      input: "text",
      inputLabel: "Enter Your Name",
      inputPlaceholder: "Enter your New Name",
    });

    if (name) {
      updateName(name);
      setName(name);
    }
  };

  return (
    <div className="flex items-center gap-3 px-5 pt-5 pb-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onClick={() => {
          if (isSoundEnabled) {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((e) => console.log(e));
          }
        }}
        onChange={handleImageUpload}
        className=" hidden"
      ></input>

      <div
        className=" absolute z-1 shrink-0 "
        style={{ opacity }}
        onMouseEnter={() => setOpacity(0.5)}
        onMouseLeave={() => setOpacity(0)}
      >
        <div
          className={`w-11 hover:animate-pulse cursor-pointer h-11 rounded-full flex items-center justify-center font-semibold text-black bg-gray-300 ring-1 ring-white/10`}
          onClick={() => fileInputRef.current.click()}
        >
          <SquarePen />
        </div>
      </div>

      {authUser.user.profileImg === "" ? (
        <div className={`relative shrink-0 opacity-100`}>
          <div
            className={`w-11 h-11 text-sm uppercase cursor-pointer rounded-full flex items-center justify-center font-semibold text-slate-900 bg-gradient-to-br from-sky-200 to-sky-600 shadow-lg shadow-black/30 ring-1 ring-white/10`}
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {authUser.user.name.substr(0, 2)}
          </div>

          <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
        </div>
      ) : (
        <div className="avatar avatar-online cursor-pointer">
          <div className="w-12 rounded-full">
            <img src={`${image || authUser.user.profileImg}`} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div
          className="text-base font-semibold"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {name}
          <button
            className=" ml-2 mt-0.5 cursor-pointer"
            onClick={handleChangeName}
          >
            <UserPen size={14} />
          </button>
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
          <Radio size={10} strokeWidth={2.5} /> Connected
        </div>
      </div>

      <button
        className="grid cursor-pointer h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
        onClick={() => {
          mouseClickSound.currentTime = 0;
          if (isSoundEnabled) {
            mouseClickSound.play().catch((error) => {
              console.log("Failed to play", error);
            });
          }
          toggleSound();
        }}
      >
        {isSoundEnabled ? <Bell size={16} /> : <BellOff size={16} />}
      </button>

      <button
        className="grid cursor-pointer h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
        onClick={handleLogout}
      >
        <LogOut size={16} />
      </button>
    </div>
  );
};

export default ProfileHeader;
