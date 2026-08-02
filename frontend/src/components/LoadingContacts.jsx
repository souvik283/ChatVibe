import React from "react";

function LoadingContacts() {
  return (
    <div className="px-2.5 space-y-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-2xl px-2.5 py-2.5 animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="h-10 w-10 shrink-0 rounded-full bg-white/10" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="h-2.5 w-8 rounded bg-white/10" />
            </div>
            <div className="h-2.5 w-36 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingContacts;
