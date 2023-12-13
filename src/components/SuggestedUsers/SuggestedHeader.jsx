import { Flex, Avatar, Text, Button } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

function SuggestedHeader() {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.username}`}>
          <Avatar
            name={authUser.fullName}
            src={authUser.profilePicURL}
            size={"lg"}
            alt={authUser.fullName}
          />
        </Link>
        <Flex direction={"column"} gap={0}>
          <Link to={`${authUser.username}`}>
            <Text fontSize={12} fontWeight={"bold"}>
              {authUser.username}
            </Text>
            <Text fontSize={14} color={"gray.400"}>
              {authUser.fullName}
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Button
        size={"sx"}
        background={"transparent"}
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        isLoading={isLoggingOut}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Flex>
  );
}

export default SuggestedHeader;
