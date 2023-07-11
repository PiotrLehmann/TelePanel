import {
  //   ModalOverlay,
  //   ModalContent,
  //   ModalHeader,
  //   ModalFooter,
  //   ModalBody,
  //   ModalCloseButton,
  //   Button,
  //   useDisclosure,
  useToast,
  //   FormControl,
  //   Input,
  //   Box,
} from "@chakra-ui/react";
import { Box, Fade, Modal, FormControl, Input, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const GroupChatModal: React.FC = ({ children }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.default",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style} width={{ xl: "40vw", sm: "90vw" }}>
            <FormControl>
              <Input placeholder="Title..." onChange={typingHandlerTitle} />
            </FormControl>
            <FormControl>
              <Input placeholder="Text..." onChange={typingHandlerText} />
            </FormControl>
            <Button onClick={addAnnouncement}>Add</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default GroupChatModal;
