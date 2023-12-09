import { VStack, Flex, Text, Box, Link } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

function SuggestedUsers() {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Text
          fontSize={12}
          fontWeight={"bold"}
          color={"blue.500"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See All
        </Text>
      </Flex>
      <SuggestedUser
        name="Dian Rahmadani"
        followers={1000}
        avatar="/img1.png"
      />
      <SuggestedUser
        name="Dian Rahmadani"
        followers={3000}
        avatar="/img2.png"
      />
      <SuggestedUser
        name="Dian Rahmadani"
        followers={2000}
        avatar="/img3.png"
      />
      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        2023 Created By{" "}
        <Link
          href="https://www.instagram.com/dian.rhmdni/"
          target="_blank"
          color={"blue.500"}
          fontSize={14}
          style={{ textDecoration: "none" }}
        >
          Dian Rahmadani
        </Link>
      </Box>
    </VStack>
  );
}

export default SuggestedUsers;
