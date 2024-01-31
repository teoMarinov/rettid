import {
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { Post } from "../common/types";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { differenceInMilliseconds, formatDistanceToNow } from "date-fns";

type PropType = {
  post: Post;
};
function PostPreview({ post }: PropType) {
  const [timeDifference, setTimeDifference] = useState<string | null>("null");

  useEffect(() => {
    const calculateTimeDifference = () => {
      const currentDate = new Date();
      const differenceInMs = differenceInMilliseconds(
        currentDate,
        post.created_at
      );

      // Format the time difference
      const formattedTimeDifference = formatDistanceToNow(post.created_at, {
        addSuffix: true,
      });

      setTimeDifference(formattedTimeDifference);
    };
    const timer = setInterval(calculateTimeDifference, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid
      templateAreas={`"like-dislike posted-by"
                      "like-dislike heading"
                      "like-dislike content"
                      "like-dislike comments"`}
      gridTemplateRows={"20px 50px 100px 25px"}
      gridTemplateColumns={"40px 550px"}
      color="blackAlpha.700"
      fontWeight="bold"
      mt={3}
      bg={"gray.200"}
      rounded={5}
      border={"1px solid black"}
    >
      <GridItem pt={2} area={"posted-by"}>
        <HStack>
          <Text fontSize={15}>posted by: u/{post.created_by}</Text>
          <Text letterSpacing={-0.5}>{timeDifference}</Text>
        </HStack>
      </GridItem>
      <GridItem pt="5" area={"like-dislike"}>
        <VStack>
          <IconButton
            size={"xs"}
            aria-label="Search database"
            icon={<TriangleUpIcon />}
          />
          <Text>{post.likes - post.dislikes}</Text>
          <IconButton
            size={"xs"}
            aria-label="Search database"
            icon={<TriangleDownIcon />}
          />
        </VStack>
      </GridItem>
      <GridItem pl={2} pt={4} area={"heading"}>
        <Heading fontSize="4xl" fontWeight="bold">
          {post.title}
        </Heading>
      </GridItem>
      <GridItem pt={5} area={"content"} overflow={"hidden"}>
        <Text fontSize={15}>{post.content}</Text>
      </GridItem>
      <GridItem pl="2" area={"comments"}>
        <Text fontSize={15}>comments: {post.comments}</Text>
      </GridItem>
    </Grid>
  );
}

export default PostPreview;
