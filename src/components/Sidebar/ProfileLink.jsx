import { Link as RouterLink } from "react-router-dom";
import { Link, Tooltip, Box, Avatar } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";

function ProfileLink() {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Tooltip
      hasArrow
      label={"Profile"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={`/${authUser?.username}`}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
      >
        <Avatar
          size={"sm"}
          src={authUser?.profilePicURL || ""}
          name={authUser?.fullName}
        />
        <Box display={{ base: "none", md: "block" }}>Profile</Box>
      </Link>
    </Tooltip>
  );
}

export default ProfileLink;
