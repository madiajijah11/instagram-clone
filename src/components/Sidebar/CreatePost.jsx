import { Tooltip, Box, Flex } from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";

function CreatePost() {
  return (
    <Tooltip
      hasArrow
      label={"Create Post"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Flex
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
      >
        <CreatePostLogo />
        <Box display={{ base: "none", md: "block" }}>Create Post</Box>
      </Flex>
    </Tooltip>
  );
}

export default CreatePost;
