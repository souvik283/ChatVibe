import React, { useEffect } from "react";
import { Link } from "react-router";
import WholeChatSection from "./ChatPage2";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const {connectSocket} = useAuthStore()
  useEffect(()=>{
    connectSocket()
  },[])
  return (
    <div className=" flex items-center justify-center min-h-screen">
      <WholeChatSection />
    </div>
  );
};

export default ChatPage;
