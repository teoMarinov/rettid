/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { submiteNewSub } from "../untils/submitNewSub";
import { SPECIAL_CHARACTERS } from "../common/constants";


function MakeNewSub() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useContext<any>(AuthContext);
  const nav = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleInput = (input: string) => {
    setDisplayName(input);
    setTitle(input.replace(/\s/g, ""));
  };

  const pressHandler = async () => {
    if (!user) {
      return;
    }
    if (SPECIAL_CHARACTERS.test(displayName))
      return setError("Name cannot include special characters");
    if (displayName.length < 4 || displayName.length > 48) {
      setError("Name must be between 4 and 48 characters!");
      return;
    }

    const submit = await submiteNewSub(displayName, title, user.username);

    if (submit.status === 0) {
      setError(submit.message);
      return;
    }
    nav("/allSubs");
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Make new Sub</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Box mt={6}>
              <Input
                placeholder="Enter sub name"
                value={displayName}
                onChange={(e) => {
                  setError("");
                  handleInput(e.target.value);
                }}
              />
              <Text color={"red"}>{error}</Text>
            </Box>
            <Text fontSize={17} mt={10}>
              r/{title}
            </Text>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button onClick={pressHandler} variant="ghost">
              Complete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MakeNewSub;
