import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
  /**
   * Custom hook for handling sign-up functionality for a user.
   *
   * @returns {Object} An object containing error, loading, and signup properties.
   *
   * @example
   * const { error, loading, signup } = useSignUpWithEmailAndPassword();
   *
   * // Call the signup function with user inputs
   * signup({
   *   email: "example@example.com",
   *   password: "password123",
   *   username: "exampleUser",
   *   fullName: "John Doe",
   * });
   */
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already taken", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser && error) {
        return showToast("Error", error.message, "error");
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        sessionStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { error, loading, signup };
};

export default useSignUpWithEmailAndPassword;
