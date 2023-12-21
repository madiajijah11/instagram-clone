import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

/**
 * A custom hook that handles the logic for following and unfollowing a user.
 * @param {string} userId - The ID of the user that the authenticated user wants to follow/unfollow.
 * @returns {object} - An object containing the following properties:
 *   - isUpdating: A boolean value indicating whether the user is currently being updated.
 *   - isFollowing: A boolean value indicating whether the authenticated user is currently following the target user.
 *   - handleFollowUser: A function that handles the logic for following and unfollowing a user.
 */
const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  /**
   * Handles the logic for following and unfollowing a user.
   */
  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });
      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      if (isFollowing) {
        // remove from following
        setAuthUser({
          ...authUser,
          following: authUser.following.filter((id) => id !== userId),
        });

        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter(
              (id) => id !== authUser.uid
            ),
          });
        }

        sessionStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((id) => id !== userId),
          })
        );
      } else {
        // add to following
        setAuthUser({
          ...authUser,
          following: [...authUser.following, userId],
        });

        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid],
          });
        }

        sessionStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );

        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};
export default useFollowUser;
