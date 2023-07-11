import {
  Box,
  Typography,
  Modal,
  Card,
  CardContent,
  Fade,
  Button,
} from "@mui/material";
import { useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import AbcIcon from "@mui/icons-material/Abc";

const Materialy = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          height: "20vh",
          borderRadius: 5,
          boxShadow: 3,
          ":hover": {
            boxShadow: 20,
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <SaveAltIcon fontSize="large" color="primary" />
            <Typography ml={1} variant="h4">
              Materiały
            </Typography>
          </Box>
        </CardContent>
      </Card>
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
              <SaveAltIcon fontSize="large" color="primary" />
              <Typography ml={1} variant="h4">
                Materiały
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(2,1fr)",
              }}
            >
              <Button
                href="https://drive.google.com/drive/u/0/folders/1NSCba6kPyWWXJAC_U0HTWfr5R11EblGW"
                target="_blank"
                size="large"
                variant="contained"
                color="primary"
              >
                <AddToDriveIcon fontSize="medium" color="#F5F5F5" />
                Nasz Dysk
              </Button>
              <Button
                target="_blank"
                href="https://drive.google.com/drive/u/0/folders/1L4IAWn5C5_xExsQumxURZDJNMBDP8C4r"
                size="large"
                variant="contained"
                color="primary"
              >
                <AddToDriveIcon fontSize="medium" color="#F5F5F5" />
                Dysk roku wyżej
              </Button>
              <Button
                target="_blank"
                href="https://drive.google.com/drive/u/0/folders/1xWAkmxYUZa3R79IAFYYy6mzEDYiPkyFp"
                size="large"
                variant="contained"
                color="primary"
              >
                <AddToDriveIcon fontSize="medium" color="#F5F5F5" />
                Wszystkie semy
              </Button>
              <Button
                target="_blank"
                href="https://sylabusy.agh.edu.pl/pl/1/2/17/1/4/4/15"
                size="large"
                variant="contained"
                color="primary"
              >
                <AbcIcon fontSize="medium" color="#F5F5F5" />
                Sylabus
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Materialy;
