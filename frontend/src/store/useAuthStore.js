import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:2000"
    : "https://chatvibe-backend-clce.onrender.com";
// const baseURL = "http://localhost:2000"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignUP: false,
  isLoggingIn: false,
  regUser: null,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      console.log("Error in auth check: ", error);
      set({ authUser: null });
    } finally {
      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 600);
    }
  },

  signUp: async (data) => {
    set({ isSignUP: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      // console.log(res.data.userNew);
      toast.success("Account Created Successfully!");
      set({ regUser: res.data.userNew });
      return true;
    } catch (error) {
      // console.log("Error in Signing Up: ", error.response.data,);
      toast.error(`${error.response.data.message}`);
    } finally {
      set({ isSignUP: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ isCheckingAuth: true });
      toast.success("Logged In Successfully!");
      await set({ authUser: res.data });

      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 300);
      get().connectSocket();
      return true;
    } catch (error) {
      console.log(error);
      // toast.error(`${error.response.data.message}`);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ isCheckingAuth: true });
      toast.success("Logged Out Successfully!");
      set({ authUser: null });
      get().disconnectSocket()
      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 300);
      return true;
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  },

  uploadProfileImg: async (image) => {
    try {
      await axiosInstance.put("/auth/updateprofile", { image });
      // console.log(res.data);
      toast.success("Image Uploaded Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Upload failed");
    }
  },

  updateName: async (name) => {
    try {
      await axiosInstance.put("/auth/updatename", { name });
      // console.log(res.data);
      toast.success("Name Updated Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser?.user || get().socket?.connected) return;

    // console.log(get().onlineUsers);

    const socket = io(baseURL, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      transports: ["websocket"],
    });

    // socket.connect()

    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
