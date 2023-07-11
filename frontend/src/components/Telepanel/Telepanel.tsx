import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  lighten,
} from "@mui/material";
import Clock from "./Clock";
import Weather from "./Weather";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

// type TelepanelProps = { lightTheme: boolean; setLightTheme: Function };

const Telepanel = () => {
  return (
    <Card
      sx={{
        borderRadius: 5,
        p: 2,
        height: "30vh",
        boxShadow: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 3,
        ":hover": {
          boxShadow: 20,
        },
      }}
    >
      <CardContent>
        <Typography variant="h3">Telepanel</Typography>
      </CardContent>
    </Card>
  );
};

export default Telepanel;
