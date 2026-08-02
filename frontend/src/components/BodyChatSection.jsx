import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { CheckCheck, MessageCircleWarning, X } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import LoadingMessages from "../components/LoadingMessages";

const BodyChatSection = () => {
  const { messages, selectedUser, isLoadingMessages } = UseChatStore();
  const { authUser } = useAuthStore();

  const scrollRef = useRef(null);

  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {}, [messages.length]);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  const removePreviewImage = (e) => {
    e.preventDefault();
    setPreviewImg(null);
  };

  if (previewImg) {
    console.log("hhchj");
    return (
      <div className="flex relative h-full items-center justify-center space-y-3 overflow-y-auto px-6 py-6">
        <button
          className=" absolute right-3 top-3 cursor-pointer"
          onClick={removePreviewImage}
        >
          <X size={40} />
        </button>
        <img src={previewImg} alt="image" className=" h-113 w-fit" />
      </div>
    );
  }

  if (isLoadingMessages) {
    return <LoadingMessages />;
  }

  if (messages.message) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-7 h-20 w-20">
          <MessageCircleWarning
            size={50}
            className=" absolute left-3 top-7  animate-pulse"
          />
        </div>
        <h2
          className="mb-2 text-xl font-semibold"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Start conversation with {selectedUser.name}
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-slate-400">
          This is the beginning of your conversation. Send message to start
          chatting!
        </p>
        <div className="flex gap-4 mt-4">
          <h4 className="bg-linear-to-r from-cyan-600 to-cyan-400 pr-2 pl-1 py-1 opacity-80 rounded-2xl cursor-pointer hover:opacity-100">
            👋Say Hello
          </h4>
          <h4 className="bg-linear-to-r from-cyan-600 to-cyan-400 pr-2 pl-1 py-1 opacity-80 rounded-2xl cursor-pointer hover:opacity-100">
            🤝How are you?
          </h4>
          <h4 className="bg-linear-to-r from-cyan-600 to-cyan-400 pr-2 pl-1 py-1 opacity-80 rounded-2xl cursor-pointer hover:opacity-100">
            🗓️Meet you soon!
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-6 py-6">
      {messages.map((m) => (
        <div
          key={m._id}
          className={`flex ${m.senderId === authUser.user._id ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[62%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
              m.senderId === authUser.user._id
                ? "rounded-br-md bg-gradient-to-br from-amber-200 to-amber-500 font-medium text-amber-950"
                : "rounded-bl-md border border-white/10 bg-white/5 text-stone-100"
            }`}
          >
            {m.image ? (
              <div
                className=" cursor-pointer mb-1"
                onClick={(e) => {
                  e.preventDefault();
                  setPreviewImg(m.image);
                }}
              >
                <img
                  src={m.image}
                  alt="Chat Image"
                  className="w-65 rounded-xl"
                />
              </div>
            ) : null}

            <div>{m.text}</div>
            <div
              className={` flex justify-self-end items-center gap-1 text-[10.5px] ${
                m.from === authUser.user._id
                  ? "justify-end text-amber-900/70"
                  : "text-slate-500"
              }`}
            >
              {m.time ||
                new Date(m.createdAt).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              {/* {m.senderId === authUser.user._id && <CheckCheck size={12} />} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BodyChatSection;
