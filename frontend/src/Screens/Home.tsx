import { useState } from "react";
import { Circle, useToast } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  createTheme,
  Grid,
  Typography,
  Container,
  Button,
  Paper,
  List,
  Modal,
  Fade,
  Avatar,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import AddIcon from "@mui/icons-material/Add";
import CssBaseline from "@mui/material/CssBaseline";
import Telepanel from "../components/Telepanel/Telepanel";
import Clock from "../components/Telepanel/Clock";
import Weather from "../components/Telepanel/Weather";
import axios from "axios";
import { useEffect } from "react";
import Post from "../components/Ogloszenia/Post";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AnnouncementModal from "./AnnouncementModal";
import Materialy from "../components/Materialy";
import Kalendarz from "../components/Kalendarz";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const themeDark = createTheme({
  palette: {
    background: {
      default: "#121212",
      paper: "#141414",
    },
    primary: {
      main: "#E59500",
    },
    text: {
      primary: "#EBEBEB",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

const themeLight = createTheme({
  palette: {
    background: {
      default: "#EDEBE9",
      paper: "#F5F5F5",
    },
    primary: {
      main: "#E59500",
    },
    text: {
      primary: "#5A5A5A",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  const [lightTheme, setLightTheme] = useState<boolean>(false);
  //const [postList, setPostList] = useState([]);
  const toast = useToast();

  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/announcement`
      );
      await setAnnouncements(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [announcements]);

  const [openProfile, setOpenProfile] = useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

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
    <ThemeProvider theme={lightTheme ? themeLight : themeDark}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters sx={{ paddingX: 4 }}>
        <Grid
          container
          spacing={4}
          sx={{ minHeight: "100vh" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item container spacing={3} xs={12} md={4} xl={4}>
            <Grid item xs={12} md={12} xl={12}>
              <Telepanel />
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Card
                sx={{
                  height: "10vh",
                  display: "flex",
                  borderRadius: 5,
                  boxShadow: 3,
                  ":hover": {
                    boxShadow: 20,
                  },
                }}
              >
                <CardActions>
                  <Button
                    color="primary"
                    onClick={() => setLightTheme(!lightTheme)}
                    sx={{ height: "100%", borderRadius: 5 }}
                  >
                    {lightTheme ? (
                      <DarkModeOutlinedIcon fontSize="medium" />
                    ) : (
                      <LightModeOutlinedIcon fontSize="medium" />
                    )}
                  </Button>
                  <Button
                    onClick={handleOpenProfile}
                    sx={{ height: "100%", borderRadius: 5 }}
                  >
                    <PersonIcon fontSize="medium" />
                  </Button>
                  <Button sx={{ height: "100%", borderRadius: 5 }}>
                    <LogoutIcon fontSize="medium" />
                  </Button>
                </CardActions>
              </Card>
              <Modal
                open={openProfile}
                onClose={handleCloseProfile}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Fade in={openProfile}>
                  <Box sx={style}>
                    <Box
                      mb={3}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <Avatar
                        sx={{
                          fontSize: "3rem",
                          height: "5rem",
                          width: "5rem",
                          mb: 2,
                        }}
                      >
                        {localStorage.getItem("name")?.charAt(1)}
                      </Avatar>
                      <Typography ml={1} variant="h6">
                        {localStorage
                          .getItem("name")
                          ?.slice(1, self.length - 1)}
                      </Typography>
                      <Typography ml={1} variant="body2">
                        {localStorage
                          .getItem("email")
                          ?.slice(1, self.length - 1)}
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              </Modal>
            </Grid>
            <Grid item xs={8} md={8} xl={8}>
              <Card
                sx={{
                  height: "20vh",
                  borderRadius: 5,
                  boxShadow: 3,
                  ":hover": {
                    boxShadow: 20,
                  },
                }}
              >
                <Clock />
              </Card>
            </Grid>
            <Grid item xs={4} md={4} xl={4}>
              <Card
                sx={{
                  height: "20vh",
                  borderRadius: 5,
                  p: 2,
                  boxShadow: 3,
                  ":hover": {
                    boxShadow: 20,
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Weather />
              </Card>
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <Materialy />
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <Kalendarz />
            </Grid>
          </Grid>
          <Grid container item xs={12} md={8} xl={8} spacing={4}>
            <Grid item xs={12} md={6} xl={6}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: 3,
                  ":hover": {
                    boxShadow: 20,
                  },
                  height: "89vh",
                  overflow: "hidden",
                }}
              >
                <CardContent>
                  <Box
                    ml={1}
                    mb={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <MailOutlineIcon fontSize="large" color="primary" />
                    <Typography ml={1} variant="h4">
                      Ogłoszenia
                    </Typography>
                    <AnnouncementModal>
                      <Button color="primary">
                        <AddIcon fontSize="large" />
                      </Button>
                    </AnnouncementModal>
                  </Box>
                  {/* EXPERIMENTAL */}
                  <div className="announcements">
                    <List
                      sx={{
                        overflowY: "scroll",
                        "&::-webkit-scrollbar": { display: "none" },
                        height: "75vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {announcements
                        .slice(0)
                        .reverse()
                        .map((post) => {
                          return (
                            <Post
                              title={post.title}
                              user={post.author}
                              text={post.announcementText}
                            />
                          );
                        })}
                    </List>
                  </div>
                  {/* EXPERIMENTAL */}
                  {/* <List
                    sx={{
                      overflowY: "scroll",
                      "&::-webkit-scrollbar": { display: "none" },
                      height: "75vh",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {data["Post List"].map((post) => {
                      return (
                        <Post
                          title={post.title}
                          user={post.user}
                          data={post.data}
                          text={post.text}
                        />
                      );
                    })}
                  </List> */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: 3,
                  ":hover": {
                    boxShadow: 20,
                  },
                  height: "89vh",
                }}
              >
                <CardContent>
                  <Typography ml={1} variant="h4">
                    Ten Tydzień
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
