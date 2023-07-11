import {
  Box,
  Fade,
  Modal,
  FormControl,
  Input,
  Button,
  Typography,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const GroupChatModal: React.FC = ({ children }: any) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const typingHandlerTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const typingHandlerText = (e: any) => {
    setText(e.target.value);
    //console.log(text);
  };

  const [toastOpen, setToastOpen] = useState(false);
  const handleToast = () => {
    setToastOpen(true);
  };
  const handleToastClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleToastClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const [message, setMessage] = useState("Dodano ogłoszenie!");

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

      setMessage("Dodano ogłoszenie!");
      handleToast();
      // setAnnouncements([...announcements, data]); //to do
    } catch (error) {
      setMessage("Wystąpił błąd!");
      handleToast();
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
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        message={message}
        action={action}
      >
        <Alert
          onClose={handleToastClose}
          severity={message == "Dodano ogłoszenie!" ? "success" : "error"}
        >
          {message}
        </Alert>
      </Snackbar>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style} width={{ xl: "40vw", sm: "90vw" }}>
            <Box
              mb={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <MailOutlineIcon fontSize="large" color="primary" />
              <Typography ml={1} variant="h4">
                Dodaj ogłoszenie
              </Typography>
            </Box>
            <FormControl fullWidth={true}>
              <Input
                placeholder="Title..."
                onChange={typingHandlerTitle}
                sx={{ marginBottom: 2 }}
              />
              <Input
                placeholder="Text..."
                onChange={typingHandlerText}
                multiline={true}
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" onClick={addAnnouncement}>
                Dodaj
              </Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default GroupChatModal;
