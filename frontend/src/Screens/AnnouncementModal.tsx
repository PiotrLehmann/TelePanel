import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const GroupChatModal: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const toast = useToast();

  const typingHandlerTitle = (e) => {
    setTitle(e.target.value);
  };

  const typingHandlerText = (e) => {
    setText(e.target.value);
    //console.log(text);
    
  };

  const addAnnouncement = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          // Authorization: `Bearer ${user.token}`, //to do
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/announcement",
        {
          title: title,
          announcementText: text,
          // user: xxx, //to do
        },
        config
      );

      // setAnnouncements([...announcements, data]); //to do
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the announcement",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Adding an announcement
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Title..."
                mb={3}
                onChange={typingHandlerTitle}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Text..."
                mb={1}
                onChange={typingHandlerText}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap"></Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={addAnnouncement}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
