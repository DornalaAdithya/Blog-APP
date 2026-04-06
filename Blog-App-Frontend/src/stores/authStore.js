import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  //states
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (userCredObj) => {
    try {
      set({ loading: true, error: null, isLoggingIn: true });

      const res = await axios.post("http://localhost:4000/common-api/login", userCredObj, { withCredentials: true });

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        error: err.response?.data?.error || "Login Failed",
      });
    }
  },

  logout: async () => {
    try {
      //set loading state
      set({ loading: true, error: null });
      //make logout api request
      await axios.get("http://localhost:4000/common-api/logout", { withCredentials: true });
      //update state
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      console.log("error is ", err);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout Failed",
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true });

      const res = await axios.get("http://localhost:4000/common-api/check-auth", { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  },
}));
