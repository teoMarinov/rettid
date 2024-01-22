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
    "username length": "",
    "nickname length": "",
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
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
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
      console.log('mail exists!')
      setErrors({ ...errors, "email taken": "That email is taken!" });
      return;
    } else {
      setErrors({ ...errors, "email taken": "" });
    }
    if (username.length < 4 || username.length > 16) {
      setErrors({
        ...errors,
        "username length": "Username must be between 4 and 16 characters!",
      });
      return;
    } else {
      setErrors({ ...errors, "username length": "" });
    }
    if (nickname.length < 4 || nickname.length > 16) {
      setErrors({
        ...errors,
        "nickname length": "Nickname must be between 4 and 16 characters!",
      });
      return;
    } else {
      setErrors({ ...errors, "nickname length": "" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ ...errors, "invalid email": "Invalid email" });
      return;
    } else {
      setErrors({ ...errors, "invalid email": "" });
    }
    if (checkPassword()) {
      setErrors({
        ...errors,
        "password requirements":
          "Password must be between 6 and 32 have at least 1 upper case 1 number 1 special char!",
      });
    } else {
      setErrors({ ...errors, "password requirements": "" });
    }
    if (password !== confirmPassword) {
      setErrors({
      ...errors,
         "passwords don't match": "Passwords don't match!",
      });
    } else {
      setErrors({...errors, "passwords don't match": "" });
    }
    signUp();
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
