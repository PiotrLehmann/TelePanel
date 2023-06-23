import { useState } from "react";
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
import { ThemeProvider } from "@emotion/react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import azure from "../assets/images/azure.png";

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

const LoginScreen = () => {
  const [lightTheme, setLightTheme] = useState<boolean>(false);

  return (
    <ThemeProvider theme={lightTheme ? themeLight : themeDark}>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" marginBottom={5}>
          TelePanel
        </Typography>
        <Box display="flex">
          <Button
            sx={{ height: "100%", mr: 1 }}
            color="primary"
            variant="outlined"
            onClick={() => setLightTheme(!lightTheme)}
          >
            {lightTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </Button>
          <Button
            sx={{ height: 100, width: 200, ml: 1 }}
            color="primary"
            variant="outlined"
          >
            <img src={azure} />
          </Button>
        </Box>
        <Typography marginTop={4}>Zaloguj się poprzez konto AGH</Typography>
      </Container>
    </ThemeProvider>
  );
};

export default LoginScreen;
