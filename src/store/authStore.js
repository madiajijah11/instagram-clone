import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useAuthStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user-info")),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useAuthStore", useAuthStore);
}
export default useAuthStore;
