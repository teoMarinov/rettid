/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, VStack, Center, Button, Text, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signUp, usernameTaken, emailTaken } from "../servive/auth-service";
import { SPECIAL_CHARACTERS, EMAIL_REGEX, MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "../common/constants";

function Signup() {
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
 
  const pressHandler = async () => {
    const usernameExists = await usernameTaken(username);
    const emailExists = await emailTaken(email);
    if (usernameExists) {
      setErrors({ ...errors, "username taken": "That username is taken!" });
      return;
    }
    if (emailExists) {
      setErrors({ ...errors, "email taken": "That email is taken!" });
      return;
    }
    if (
      username.length < MIN_NAME_LENGTH ||
      username.length > MAX_NAME_LENGTH ||
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
      nickname.length < MIN_NAME_LENGTH ||
      nickname.length > MAX_NAME_LENGTH ||
      SPECIAL_CHARACTERS.test(nickname)
    ) {
      setErrors({
        ...errors,
        "nickname requirements":
          "Nickname must be between 4 and 16 characters and have no special characters!",
      });
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
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
    signUp(username, nickname, email, password);
  };

  return (
    <Center height={"100vh"}>
      <VStack width={"260px"}>
      <Heading mb={2}>Sign up</Heading>
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
        <Button mb={1} onClick={pressHandler}>Sign up</Button>
        <Link style={{color:"blueviolet"}} to="/login">Already have an account?</Link>
      </VStack>
    </Center>
  );
}

export default Signup;
