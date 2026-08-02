// LoadingMessages

function LoadingMessages() {
  const rows = [
    { side: "right", w: "w-40" },
    { side: "left", w: "w-56" },
    { side: "right", w: "w-32" },
    { side: "right", w: "w-52" },
    { side: "left", w: "w-44" },
    { side: "left", w: "w-60" },
    { side: "right", w: "w-50" },
    { side: "left", w: "w-40" },
  ];
  return (
    <div className="flex-1 space-y-3 overflow-hidden px-6 py-6">
      {rows.map((r, i) => (
        <div
          key={i}
          className={`flex ${r.side === "right" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`h-11 ${r.w} animate-pulse rounded-2xl ${
              r.side === "right"
                ? "rounded-br-md bg-amber-400/15"
                : "rounded-bl-md border border-white/10 bg-white/5"
            }`}
            style={{ animationDelay: `${i * 90}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

export default LoadingMessages;
