import { Input, VStack, Center, Button, Text, Heading } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { login } from "../servive/auth-service";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setUserData] = useContext(AuthContext);
  const nav = useNavigate()
 
  const onLogin = async () => {
    const result = await login(username, password);
    if (!result.status) {
      setError("Username and password don't match");
      return
    }
    setUserData(result.data);
    nav("/")
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onLogin();
    }
  };

  return (
    <Center height={"100vh"} onKeyDown={handleKeyDown}>
      <VStack width={"260px"}>
        <Heading mb={2}>Log in</Heading>
        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Text color={"red"}>{error}</Text>
        <Button mb={1} onClick={onLogin}>
          Log in
        </Button>
        <Link style={{ color: "blueviolet" }} to="/signup">
          Don't have an account?
        </Link>
      </VStack>
    </Center>
  );
}

export default Login;
