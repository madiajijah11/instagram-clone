import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useUserProfileStore = create((set) => ({
  userProfile: null,
  addPost: (post) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
  deletePost: (postId) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((id) => id !== postId),
      },
    })),
  setUserProfile: (userProfile) => set({ userProfile }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useUserProfileStore", useUserProfileStore);
}

export default useUserProfileStore;
