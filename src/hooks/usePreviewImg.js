import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  /**
   * Custom hook to handle image preview functionality.
   * @returns {Object} An object containing the selectedFile, handleImageChange, and setSelectedFile functions.
   */
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSize = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image")) {
      if (file.size > maxFileSize) {
        showToast("Error", "File size must be less than 2MB", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
      return;
    }
    showToast("Error", "Please select an image file", "error");
    setSelectedFile(null);
  };
  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
