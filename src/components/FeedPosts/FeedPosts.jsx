import React from "react";
import FeedPost from "./FeedPost";
import {
  Container,
  VStack,
  Flex,
  SkeletonCircle,
  Skeleton,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

function FeedPosts() {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [...Array(3)].map((_, index) => (
          <VStack
            key={`skeleton-${index}`}
            alignItems={"flex-start"}
            gap={4}
            mb={10}
          >
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={"10px"} w={"200px"} />
                <Skeleton height={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>content wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}

      {!isLoading && posts.length === 0 && (
        <>
          <Text fontSize={"md"} color={"red.400"} fontWeight={"bold"}>
            Looks like you are not following anyone. Follow people to see their
            posts.
          </Text>
        </>
      )}
    </Container>
  );
}

export default FeedPosts;
