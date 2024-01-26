import Logout from "./Logout"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

function Home() {
  const nav = useNavigate();
const newSub = () => {
  nav("creatSub");
}
  return (
    <>
   <Logout/>
   <Button onClick={newSub}>NewSub</Button>
   <Button onClick={() => nav("/allSubs")}>list</Button>
    </>
  )
}

export default Home
