/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, VStack, Center, Button } from "@chakra-ui/react";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    "username taken": "",
    "username too short": "",
    "nickname too short": "",
    "email taken": "",
    "password requirements": "",
    "passwords don't match": "",
  });

  const usernameTaken = () => {
    const url = "http://localhost/rettid/Api/users/check_username";
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(username),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result.exists) {
          console.log("taken");
          setErrors({
            ...errors,
            "username taken": "That username already exists",
          });
        } else {
          console.log("not taken");
          setErrors({
            ...errors,
            "username taken": "",
          });
        }
      })
      .catch((error) => {
        console.error("Error!!!:", error.message);
      });
  };

  const checkForErrors = () => {
    usernameTaken();
  };

  // const signUp = () => {
  //   const form = {
  //     username,
  //     nickname,
  //     password,
  //     email,
  //   };

  //   const url = "http://localhost/rettid/Api/users/signup";

  //   const headers = new Headers({
  //     "Content-Type": "application/json",
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify(form),
  //   };

  //   fetch(url, requestOptions)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .catch((error) => {
  //       console.error("Error!!!:", error.message);
  //     });
  // };

  const handleSubmit = () => {
    checkForErrors();
    if (errors["username taken"]) {
      alert("Taken");
    }

    // signUp();
  };

  return (
    <Center height={"100vh"}>
      <VStack width={"300px"}>
        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            borderColor: errors && errors["username taken"] ? "red" : "none",
          }}
        />
        <Input
          placeholder="Enter display name"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Center>
  );
}

export default Signup;
