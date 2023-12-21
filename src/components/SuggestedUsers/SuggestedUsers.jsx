import { VStack, Flex, Text, Box, Link } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

function SuggestedUsers() {
  const { suggestedUsers, isLoading } = useGetSuggestedUsers();

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
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
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser key={user.id} user={user} setUser={user} />
      ))}
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
