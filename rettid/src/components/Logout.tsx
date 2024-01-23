import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { logout } from "../servive/auth-service";

function Logout() {
  const nav = useNavigate();
  const [userData, setUserData] = useContext(AuthContext);
  
  const pressHandler = () => {
    setUserData(null);
    const token = sessionStorage.getItem('logged in');
    logout(token);
    localStorage.removeItem("logged in");
    nav("login");
  };
  return (<Button onClick={pressHandler}>Logout</Button>);
}

export default Logout;
