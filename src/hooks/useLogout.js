import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
  /**
   * Custom hook that handles the logout functionality in a React application.
   * It uses other custom hooks and functions to perform the necessary actions.
   *
   * @returns {Object} An object containing the handleLogout function, isLoggingOut boolean, and error string.
   */
  const showToast = useShowToast();
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut();
      sessionStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { handleLogout, isLoggingOut, error };
};

export default useLogout;
