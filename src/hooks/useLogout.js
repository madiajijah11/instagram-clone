import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";

function useLogout() {
  const showToast = useShowToast();
  const [signOut, isLoggingOut, error] = useSignOut(auth);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { handleLogout, isLoggingOut, error };
}

export default useLogout;
