import React from "react";
import {
  Avatar,
  Flex,
  Box,
  SkeletonCircle,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { timeAgo } from "./../../utils/timeAgo";
import { Link } from "react-router-dom";
import useFollowUser from "./../../hooks/useFollowUser";

function PostHeader({ post, creatorProfile }) {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
    post.createdBy
  );
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        {creatorProfile ? (
          <Link to={`/${creatorProfile.username}`}>
            <Avatar
              name={creatorProfile.fullName}
              src={creatorProfile.profilePicURL}
              size={"sm"}
              alt={creatorProfile.username}
            />
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {creatorProfile ? (
            <>
              <Link to={`/${creatorProfile.username}`}>
                {creatorProfile.username}{" "}
              </Link>
              <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box>
            </>
          ) : (
            <Skeleton height={"10px"} w={"100px"} />
          )}
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          bg={"transparent"}
          fontSize={12}
          fontWeight={"bold"}
          color={"blue.500"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          isLoading={isUpdating}
          onClick={handleFollowUser}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
}

export default PostHeader;
