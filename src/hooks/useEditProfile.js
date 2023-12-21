import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

/**
 * Custom hook for editing a user's profile.
 *
 * @returns {Object} Contains two properties:
 * - `isUpdating`: A boolean indicating whether the profile is currently being updated.
 * - `editProfile`: A function that takes two parameters:
 *   - `inputs`: An object containing the new profile data. It should have `fullName`, `username`, and `bio` properties.
 *   - `selectedFile`: A string representing the data URL of the selected profile picture file. If this parameter is provided, the profile picture will be updated.
 *   This function updates the user's profile in Firestore, updates the user's profile in the local state, and shows a toast notification indicating whether the update was successful.
 */
const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return;

    setIsUpdating(true);
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);

    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      const updateUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      await updateDoc(userDocRef, updateUser);
      localStorage.setItem("user-info", JSON.stringify(updateUser));
      setAuthUser(updateUser);
      setUserProfile(updateUser);

      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { isUpdating, editProfile };
};

export default useEditProfile;
