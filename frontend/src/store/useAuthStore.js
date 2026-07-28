import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignUP: false,
  isLoggingIn: false,
  regUser: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
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
      toast.success("Account Created Successfully!");
      set({ authUser: res.data });
      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 300);
      return true;
    } catch (error) {
      toast.error(`${error.response.data.message}`);
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
      setTimeout(() => {
        set({ isCheckingAuth: false });
      }, 300);
      return true;
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  },

}));
