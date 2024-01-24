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
    </>
  )
}

export default Home
