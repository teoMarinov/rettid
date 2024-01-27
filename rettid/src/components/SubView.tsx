import { useLocation } from "react-router-dom";
import { getSubInfo } from "../untils/getSubInfo";
import { useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { SubRettidData } from "../common/types";
export default function SubView() {
  const [data, setData] = useState<SubRettidData>([]);

  const subName = useLocation().pathname.split("/")[1];

  const normalizedName = subName.replace(/_/g, " ");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubInfo(subName)
      .then((result) => setData(result.data))
      .then(() => setLoading(false));
  }, [subName]);

  return (
    <>
      {loading ? (
        <Heading>Now loading</Heading>
      ) : (
        <>
          <Box w={"full"} h={"250px"} bg={"skyblue"} />
          <Box h={"100px"} bg={'darkgray'}><Heading>{data.sub.display_name}</Heading></Box>
        </>
      )}
    </>
  );
}
