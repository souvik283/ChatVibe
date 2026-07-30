import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const UseChatStore = create((set, get) => ({
    allContacts: [],
    chatContacts: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isLoadingUsers: false,
    isLoadingMessages: false,

    isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

    toggleSound: () =>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled) 
        set({isSoundEnabled: !get().isSoundEnabled })
    },
    setActiveTab: (tab)=>{
        set({activeTab: tab})
    },
    setSelectedUser: (user) =>{
        // console.log(user);
        set({selectedUser: user})
    },

    getContacts: async () => {
        set({isLoadingUsers: true})
        try {
          const res = await  axiosInstance.get("/message/contacts")
          set({allContacts: res.data.contactUsers})
        //   console.log(res.data.contactUsers);
        //   toast.success("Successful")
        } catch (error) {
            console.log("error: ", error)
            toast.error(error.response.data)
        }finally{
            set({isLoadingUsers: false})
        }
    },
    
    getChattingContacts: async () => {
        set({isLoadingUsers: true})
        try {
          const res = await  axiosInstance.get("/message/chats")
          set({chatContacts: res.data.chatPartners})
        //   console.log(res.data);
        //   toast.success("Successful")
        } catch (error) {
            console.log("error: ", error)
            toast.error(error.response.data)
        }finally{
            set({isLoadingUsers: false})
        }
    },

    getChatsOfUser: async (id) => {
        set({isLoadingMessages: true})
        try {
          const res = await  axiosInstance.get(`/message?id=${id}`)
          set({chatContacts: res.data.chatPartners})
        //   console.log(res.data);
        //   toast.success("Successful")
        } catch (error) {
            console.log("error: ", error)
            toast.error(error.response.data)
        }finally{
            set({isLoadingMessages: false})
        }
    },
}))