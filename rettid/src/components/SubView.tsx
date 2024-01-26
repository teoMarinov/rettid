import { useLocation } from "react-router-dom"
import { getSubInfo } from "../untils/getSubInfo";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { SubRettidData } from "../common/types";
export default function SubView() {

  const [data, setData] = useState<SubRettidData>()

  const subName = useLocation().pathname.split("/")[1];

  const normalizedName = subName.replace(/_/g, " ");
  
  useEffect(() => {
    getSubInfo(subName)
    .then(result => setData(result.data))
    
  },[])

    return (
      <div>
       {normalizedName}
       <Button onClick={() => console.log(data)}>Info</Button>
      </div>
    );
}
