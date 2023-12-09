import React from "react";
import FeedPost from "./FeedPost";
import {
  Container,
  VStack,
  Flex,
  SkeletonCircle,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function FeedPosts() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [...Array(4)].map((_, index) => (
          <VStack key={index} alignItems={"flex-start"} gap={4} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={"10px"} w={"200px"} />
                <Skeleton height={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>content wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading && (
        <>
          <FeedPost
            username={"dian.rhmdni"}
            img={"./img1.png"}
            avatar={"./img1.png"}
          />
          <FeedPost
            username={"dian.rhmdni"}
            img={"./img2.png"}
            avatar={"./img2.png"}
          />
          <FeedPost
            username={"dian.rhmdni"}
            img={"./img3.png"}
            avatar={"./img3.png"}
          />
          <FeedPost
            username={"dian.rhmdni"}
            img={"./img4.png"}
            avatar={"./img4.png"}
          />
        </>
      )}
    </Container>
  );
}

export default FeedPosts;
