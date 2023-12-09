import { Flex, Avatar, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function SuggestedHeader() {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar
          name="Dian Rahmadani"
          src="/profilepic.png"
          size={"lg"}
          alt="dian.rhmdni"
        />
        <Text fontSize={12} fontWeight={"bold"}>
          dian.rhmdni
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        to={"/auth"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        style={{ textDecoration: "none" }}
        cursor={"pointer"}
      >
        Logout
      </Link>
    </Flex>
  );
}

export default SuggestedHeader;
