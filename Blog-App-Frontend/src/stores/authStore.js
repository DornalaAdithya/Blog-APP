import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCredObj) => {
    try {
      //set loading true
      set({ loading: true, error: null });
      //make api call
      const res = await axios.post("http://localhost:4000/common-api/login", userCredObj, { withCredentials: true });
      // console.log("res is ", res);
      //update state
      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
      });
    } catch (err) {
      console.log("error is ", err);
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
}));
