import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


export const UseChatStore = create((set, get) => ({
  allContacts: [],
  chatContacts: [],
  messages: [{}],
  activeTab: "chats",
  selectedUser: null,
  isLoadingUsers: false,
  isLoadingMessages: false,
  isSendingMessages: false,

  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  setSelectedUser: (user) => {
    // console.log(user);
    set({ selectedUser: user });
  },

  getContacts: async () => {
    set({ isLoadingUsers: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data.contactUsers });
      //   console.log(res.data.contactUsers);
      //   toast.success("Successful")
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.response.data);
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  getChattingContacts: async () => {
    set({ isLoadingUsers: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chatContacts: res.data.chatPartners });
      //   console.log(res.data);
      //   toast.success("Successful")
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.response?.data || "Failed to getting Contacts");
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  getChatsOfUser: async () => {
    set({ isLoadingMessages: true });
    const { selectedUser } = get();
    try {
      const res = await axiosInstance.get(`/message?id=${selectedUser._id}`);
      set({ messages: res.data });
      //   console.log(res.data);
      //   toast.success("Successful")
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.response.data);
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  sendMessage: async (data) => {
    set({ isSendingMessages: true });
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();
    const tempId = `temp-${Date.now()}`;

    const tempMessage = {
      _id: tempId,
      senderId: authUser.user._id,
      recieverId: selectedUser._id,
      text: data.text,
      image: data.image,
      time: new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
   
    
    if (!messages[0]) {
      set({ messages: [tempMessage] });
    }else{
    set({ messages: [...messages, tempMessage] });
    }
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        data,
      );
      //   console.log(res.data);
      //   toast.success("Successful")
      return res.data;
    } catch (error) {
      console.log("error: ", error);
      // toast.error(error.response.data)
    } finally {
      set({ isSendingMessages: false });
    }
  },

  subscribeToMessage : () => {
   const {isSoundEnabled, selectedUser } = get()

   if(!selectedUser) return

   const socket = useAuthStore.getState().socket

   socket.on("newMessage", (newMessage)=>{
   const isMessageSendToUser = newMessage.senderId == selectedUser._id
   
if(!isMessageSendToUser) return
    const currentMessage = get().messages
    set({messages: [...currentMessage, newMessage]})

  if (isSoundEnabled) {
  const notificationSound = new Audio("/sound/notification.mp3");
  notificationSound.currentTime = 0;

  notificationSound.play().catch((error) => {
    console.log("Unable to play sound:", error);
  });
}
   })
  },

  unsubscribeFromMessage : () =>{
    const socket = useAuthStore.getState().socket
    socket.off("newMessage")
  }
}));
