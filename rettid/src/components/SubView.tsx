import { useLocation } from "react-router-dom"
import { getSubInfo } from "../untils/getSubInfo";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { SubRettidData } from "../common/types";
export default function SubView() {

  const [data, setData] = useState<SubRettidData>()

  const subName = useLocation().pathname.split("/")[1];

  useEffect(() => {
    getSubInfo(subName)
    .then(result => setData(result.data))
    
  },[])

    return (
      <div>
       {subName}
       <Button onClick={() => console.log(data)}>Info</Button>
      </div>
    );
}
