import { useEffect, useState } from "react";
import { getAllSubNames } from "../untils/getAllSubNames";
import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function ListAllSubs() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllSubNames().then((response) => setData(response.data));
  }, []);
  const pressHandler = (title: string) => {
    nav(`/${title}`)
  }
  return (
    <div>
      All subs
      <Button onClick={() => console.log(data)}>Click</Button>
      {data.map((name: string) => (
        <Text key={name} onClick={() => pressHandler(name)}>r/{name}</Text>
      ))}
    </div>
  );
}

export default ListAllSubs;
