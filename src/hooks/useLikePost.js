import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePost = (post) => {
  /**
   * Custom hook for handling the functionality of liking a post.
   *
   * @param {object} post - The post object containing the post ID and an array of user IDs who have liked the post.
   * @returns {object} - An object containing state variables and functions related to liking a post.
   * @property {boolean} isUpdating - Indicates whether the like operation is currently being updated.
   * @property {boolean} isLiked - Indicates whether the post is liked by the authenticated user.
   * @property {number} likes - The total number of likes for the post.
   * @property {function} handleLikePost - A function that handles the like/unlike operation for the post.
   */
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser)
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };
  return { isUpdating, isLiked, likes, handleLikePost };
};

export default useLikePost;
