import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  /**
   * A custom hook that displays toast notifications using the Chakra UI library in a React application.
   *
   * @returns {Function} A memoized callback function that takes three parameters: `title`, `description`, and `status`.
   */
  const toast = useToast();

  return useCallback(
    (title, description, status) => {
      toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );
};

export default useShowToast;
