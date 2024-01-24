import {
  Heading,
  Button,
  VStack,
  Center,
  HStack,
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
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { submiteNewSub } from "../untils/submitNewSub";

function MakeNewSub() {
    
    const [user] = useContext(AuthContext);
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [error, setError] = useState("")
    const pressHandler = async() => {
    if (!user) nav("/login");
   const submit = await submiteNewSub(name, user.username);
   if (submit.status == 0) return setError(submit.message);
   nav("/");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Make new Sub</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Input
              placeholder="Enter sub name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mt={6}
            />
            <Text fontSize={17} mt={10}>r/{name}</Text>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button onClick={pressHandler} variant="ghost">Complete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MakeNewSub;
