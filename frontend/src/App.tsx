import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";

const App = () => {
=======
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

import { config } from './Config';
import { PublicClientApplication } from "@azure/msal-browser";

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

// to class?
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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
