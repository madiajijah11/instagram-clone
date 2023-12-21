import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
  /**
   * Fetches a user profile from a Firestore database based on the given user ID.
   * @param {string} userId - The ID of the user whose profile needs to be fetched.
   * @returns {Object} An object containing the isLoading and userProfile states.
   * - isLoading (boolean): Indicates whether the user profile data is currently being fetched (true) or not (false).
   * - userProfile (object): The fetched user profile data, or null if the data is not available yet.
   */
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, setUserProfile, userId]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
