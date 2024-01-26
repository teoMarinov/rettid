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

function MakeNewSub() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useContext(AuthContext);
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");


  const pressHandler = async () => {
    if (!user) {
      nav("/login");
      return;
    }
  
    if (name.length < 4 || name.length > 48) {
      setError("Name must be between 4 and 48 characters!");
      return;
    }
  
    try {
      const submit = await submiteNewSub(name, user.username);
  
      if (submit.status === 0) {
        setError(submit.message);
      } else if (submit.status === 1) {
        // Handle success case
        nav("/allSubs");
      } else {
        // Handle unexpected status
        setError("Unexpected status: " + submit.status);
      }
    } catch (error) {
      // Handle fetch or other errors
      console.error("Error during submission:", error.message);
      setError("Error during submission. Please try again.");
    }
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
                value={name}
                onChange={(e) => {
                  setError("");
                  setName(e.target.value);
                }}
              />
              <Text color={"red"}>{error}</Text>
            </Box>
            <Text fontSize={17} mt={10}>
              r/{name}
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
