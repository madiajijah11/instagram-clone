import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: null,
  addPost: (post) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),
  deletePost: (id) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((postId) => postId !== id),
      },
    })),
  setUserProfile: (userProfile) => set({ userProfile }),
}));

export default useUserProfileStore;
