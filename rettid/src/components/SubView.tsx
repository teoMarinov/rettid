/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { getSubInfo } from "../untils/getSubInfo";
import { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Input,
  VStack,
  Center,
} from "@chakra-ui/react";
import { Post, SubRettidData } from "../common/types";
import { AuthContext } from "../context/AuthContext";
import PostPreview from "./PostPreview";

export default function SubView() {
  const userData = useContext<any>(AuthContext);
  const subName = useLocation().pathname.split("/")[1];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SubRettidData | any>([]);
  console.log("🚀 ~ SubView ~ data:", data.posts);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [isMod, setIsMod] = useState(false);

  useEffect(() => {
    getSubInfo(subName)
      .then((result) => {
        setData(result.data);
        return result.data;
      })
      .then((data) => {
        if (data.bans.includes(userData[0].username)) setIsBanned(true);
        if (data.followers.includes(userData[0].username)) setIsFollowing(true);
        if (data.mods.includes(userData[0].username)) setIsMod(true);
      })
      .then(() => setLoading(false));
  }, [subName]);

  return (
    <>
      {loading ? (
        <Heading>Now loading</Heading>
      ) : (
        <>
          <Box w={"full"} h={"250px"} bg={"skyblue"} />
          <Center h={"100px"} bg={"darkgray"}>
            <HStack w={'700px'}>
              <Input type="file" borderRadius={90} h={100} w={100} bg={"red"} />
              <Box>
                <Heading>{data.sub.display_name}</Heading>
                <Text>r/{data.sub.title}</Text>
              </Box>
              <Button>{isFollowing ? "Joined" : "Join"}</Button>
            </HStack>
          </Center>
          <VStack>
            {data.posts.map((post: Post) => (
              <PostPreview post={post} />
            ))}
          </VStack>
        </>
      )}
    </>
  );
}
