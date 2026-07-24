import React from "react";

const Background = () => {
  return (
    <div className=" absolute inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.16),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(6,182,212,0.14),transparent_40%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[140px]" />

      <div className="absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[140px]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
};

export default Background;
