import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
  /**
   * Custom hook to search for a user profile in a Firestore database.
   * @returns {Object} An object containing the loading state, user data, and the getUserProfile function.
   * @property {boolean} isLoading - A boolean indicating whether the search is in progress.
   * @property {Object|null} user - An object containing the user data if a user is found, or null if no user is found.
   * @property {Function} getUserProfile - A function that takes a username parameter and searches for a user profile in the Firestore database.
   */
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, user, getUserProfile, setUser };
};

export default useSearchUser;
