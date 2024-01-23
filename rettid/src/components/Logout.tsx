import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { logout } from "../servive/auth-service";

function Logout() {
  const nav = useNavigate();
  const [userData, setUserData] = useContext(AuthContext);
  
  const pressHandler = async() => {
    setUserData(null);
    await logout();
    nav("login");
  };
  return (<Button onClick={pressHandler}>Logout</Button>);
}

export default Logout;
