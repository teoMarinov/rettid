/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, VStack, Center, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

function Signup() {
  const SPECIAL_CHARACTERS = /[!@#$%^&*`(),.?":{}|<>]/;
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    "username taken": "",
    "username requirements": "",
    "nickname requirements": "",
    "email taken": "",
    "invalid email": "",
    "password requirements": "",
    "passwords don't match": "",
  });

  const usernameTaken = async () => {
    const url = "http://localhost/rettid/Api/users/check_username";
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(username),
    };

    return fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        return result.exists;
      })
      .catch((error) => {
        JSON;
        console.error("Error!!!:", error.message);
      });
  };
  const emailTaken = async () => {
    const url = "http://localhost/rettid/Api/users/check_email";
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(email),
    };
    return fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        return result.exists;
      })
      .catch((error) => {
        JSON;
        console.error("Error!!!:", error.message);
      });
  };
  const checkPassword = () => {
    if (
      password.length < 6 ||
      password.length > 32 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !SPECIAL_CHARACTERS.test(password)
    ) {
      return true;
    }
  };
  const signUp = () => {
    const form = {
      username,
      nickname,
      password,
      email,
    };

    const url = "http://localhost/rettid/Api/users/signup";

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(form),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error!!!:", error.message);
      });
  };
  const handleSubmit = async () => {
    const usernameExists = await usernameTaken();
    const emailExists = await emailTaken();
    if (usernameExists) {
      setErrors({ ...errors, "username taken": "That username is taken!" });
      return;
    } else {
      setErrors({ ...errors, "username taken": "" });
    }
    if (emailExists) {
      setErrors({ ...errors, "email taken": "That email is taken!" });
      return;
    }
    if (
      username.length < 4 ||
      username.length > 16 ||
      SPECIAL_CHARACTERS.test(username)
    ) {
      setErrors({
        ...errors,
        "username requirements":
          "Username must be between 4 and 16 characters and have no special characters!",
      });
      return;
    }
    if (
      nickname.length < 4 ||
      nickname.length > 16 ||
      SPECIAL_CHARACTERS.test(nickname)
    ) {
      setErrors({
        ...errors,
        "nickname requirements":
          "Nickname must be between 4 and 16 characters and have no special characters!",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ ...errors, "invalid email": "Invalid email" });
      return;
    }
    if (checkPassword()) {
      setErrors({
        ...errors,
        "password requirements":
          "Password must be between 6 and 32 have at least 1 upper case 1 number 1 special char!",
      });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        "passwords don't match": "Passwords don't match!",
      });
      return;
    }
    signUp();
  };

  return (
    <Center height={"100vh"}>
      <VStack width={"300px"}>
        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setErrors({
              ...errors,
              "username taken": "",
              "username requirements": "",
            });
            setUsername(e.target.value);
          }}
          style={{
            borderColor:
              errors["username taken"] || errors["username requirements"]
                ? "red"
                : "black",
          }}
        />
        <Text color={"red"}>
          {errors["username taken"]}
          {errors["username requirements"]}
        </Text>
        <Input
          placeholder="Enter display name"
          value={nickname}
          onChange={(e) => {
            setErrors({
              ...errors,
              "nickname requirements": "",
            });
            setNickname(e.target.value);
          }}
          style={{
            borderColor: errors["nickname requirements"] ? "red" : "black",
          }}
        />
        <Text color={"red"}>{errors["nickname requirements"]}</Text>
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setErrors({
              ...errors,
              "invalid email": "",
              "email taken": "",
            });
            setEmail(e.target.value);
          }}
          style={{
            borderColor:
              errors["invalid email"] || errors["email taken"]
                ? "red"
                : "black",
          }}
        />
        <Text color={"red"}>
          {errors["invalid email"]} {errors["email taken"]}
        </Text>
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            errors["password requirements"] &&
              setErrors({
                ...errors,
                "password requirements": "",
              });
            setPassword(e.target.value);
          }}
          style={{
            borderColor: errors["password requirements"] ? "red" : "black",
          }}
        />
        <Text color={"red"}>{errors["password requirements"]}</Text>
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            errors["passwords don't match"] &&
              setErrors({
                ...errors,
                "passwords don't match": "",
              });
            setConfirmPassword(e.target.value);
          }}
          style={{
            borderColor: errors["passwords don't match"] ? "red" : "black",
          }}
        />
        <Text color={"red"}>{errors["passwords don't match"]}</Text>
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Center>
  );
}

export default Signup;
