import Logout from "./Logout"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import MakeNewSub from "./MakeNewSub";
function Home() {
  const nav = useNavigate();

  return (
    <>
   <Logout/>
   <MakeNewSub />
   <Button onClick={() => nav("/allSubs")}>list</Button>
    </>
  )
}

export default Home
