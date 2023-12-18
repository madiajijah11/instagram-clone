import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

function useShowToast() {
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
}

export default useShowToast;
