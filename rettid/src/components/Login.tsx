import { Input, VStack, Center, Button, Text, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const form = {
      username,
      password,
    };
    const url = "http://localhost/rettid/Api/users/login";
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(form),
    };
   return fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const pressHandler = async () => {
    const result = await login();
    if (!result.status) {
      setError("Username and password don't match");
      return
    }
    console.log(result.data);
  };

  return (
    <Center height={"100vh"}>
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
        <Button mb={1} onClick={pressHandler}>
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
