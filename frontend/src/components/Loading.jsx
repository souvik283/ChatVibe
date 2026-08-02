import React from "react";
import { Loader } from "lucide-react";
import { Atom } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className=" flex items-center justify-center h-screen">
      {/* <Loader className=' size-10 animate-spin'/> */}
      <Atom color={["#A855F7", "#06B6D4", "#3B82F6", "#22C55E"]} size="large" />
    </div>
  );
};

export default Loading;
