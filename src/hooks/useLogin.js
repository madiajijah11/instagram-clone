import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "./../store/authStore";

const useLogin = () => {
  /**
   * Handles the login functionality.
   *
   * @returns {Object} An object containing the login function, loading status, and error message.
   *
   * @example
   * import { useLogin } from "./useLogin";
   *
   * const LoginForm = () => {
   *   const { login, loading, error } = useLogin();
   *
   *   const handleLogin = (inputs) => {
   *     login(inputs);
   *   };
   *
   *   return (
   *     <form onSubmit={handleLogin}>
   *       {/* form inputs * /}
   *       <button type="submit">Login</button>
   *       {loading && <p>Loading...</p>}
   *       {error && <p>{error}</p>}
   *     </form>
   *   );
   * };
   */
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill in all fields", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (userCred) {
        const userRef = doc(firestore, "users", userCred.user.uid);
        const userSnap = await getDoc(userRef);
        sessionStorage.setItem("user-info", JSON.stringify(userSnap.data()));
        loginUser(userSnap.data());
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { login, loading, error };
};

export default useLogin;
