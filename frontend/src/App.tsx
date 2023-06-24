import { useState } from "react";
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
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import Telepanel from "./components/Telepanel/Telepanel";
import Clock from "./components/Telepanel/Clock";
import Weather from "./components/Telepanel/Weather";
import axios from "axios";
import { useEffect } from "react";
import data from "./jsonExamples/PostList.json";

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
      default: "#E0E0E0",
      paper: "#F5F5F5",
    },
    primary: {
      main: "#E59500",
    },
    text: {
      primary: "#141414",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  const [lightTheme, setLightTheme] = useState<boolean>(false);
  //const [postList, setPostList] = useState([]);

  const fetchDummy = async () => {
    //const data = await axios.get("http://127.0.0.1:5000/api/dummy");
    //console.log(data);
  };

  useEffect(() => {
    fetchDummy();
  }, []);

  const postList = data["Post List"];

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
                  boxShadow: 0,
                }}
              >
                <CardActions>
                  <Button
                    color="primary"
                    onClick={() => setLightTheme(!lightTheme)}
                  >
                    {lightTheme ? (
                      <DarkModeOutlinedIcon />
                    ) : (
                      <LightModeOutlinedIcon />
                    )}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={8} md={8} xl={8}>
              <Card
                sx={{
                  height: "20vh",
                  borderRadius: 5,
                  boxShadow: 0,
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
                  boxShadow: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Weather />
              </Card>
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <Card
                sx={{
                  height: "20vh",
                  borderRadius: 5,
                  p: 2,
                  boxShadow: 0,
                }}
              >
                <CardContent>
                  <Typography variant="h4">Materiały</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <Card
                sx={{ height: "20vh", borderRadius: 5, p: 2, boxShadow: 0 }}
              >
                <CardContent>
                  <Typography variant="h4">Kalendarz</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={8} xl={8} spacing={4}>
            <Grid item xs={12} md={6} xl={6}>
              <Card sx={{ borderRadius: 5, boxShadow: 0, height: "89vh" }}>
                <CardContent>
                  <Typography ml={1} variant="h4">
                    Ogłoszenia
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <Card sx={{ borderRadius: 5, boxShadow: 0, height: "89vh" }}>
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
