import React from "react";

const NoUserConversation = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-7 h-20 w-20">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-800 shadow-[0_0_60px_-8px_rgba(251,191,36,0.5)] animate-pulse" />
        <span className="absolute -inset-3 rounded-full border border-amber-400/30 animate-ping" />
      </div>
      <h2
        className="mb-2 text-xl font-semibold"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Select a conversation
      </h2>
      <p className="max-w-xs text-sm leading-relaxed text-slate-400">
        Choose someone from the list to pick up where you left off, or start
        something new.
      </p>
    </div>
  );
};

export default NoUserConversation;
