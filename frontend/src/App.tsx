import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
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

  return (
    <ThemeProvider theme={lightTheme ? themeLight : themeDark}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item container spacing={2} xs={12} md={4} xl={4}>
            <Grid item xs={12} md={12} xl={12}>
              <Telepanel />
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <Card sx={{ height: "10vh", display: "flex", borderRadius: 5 }}>
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
                  p: 2,
                  boxShadow: 0,
                }}
              >
                <CardContent>
                  <Clock />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} md={4} xl={4}>
              <Card
                sx={{
                  height: "20vh",
                  borderRadius: 5,
                  p: 2,
                  boxShadow: 0,
                }}
              >
                <CardContent>
                  <Weather />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <Card
                sx={{
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
              <Card sx={{ borderRadius: 5, p: 2, boxShadow: 0 }}>
                <CardContent>
                  <Typography variant="h4">Kalendarz</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <Card sx={{ borderRadius: 5, p: 2, height: "90vh", boxShadow: 0 }}>
              <CardContent>
                <Typography variant="h4">Ogłoszenia</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <Card sx={{ borderRadius: 5, p: 2, height: "90vh", boxShadow: 0 }}>
              <CardContent>
                <Typography variant="h4">Ten Tydzień</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
