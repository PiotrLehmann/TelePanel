import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { format } from "date-fns";

const Clock = () => {
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();

  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  setInterval(updateTime, 1000);

  return (
    <Box
      sx={{
        height: "20vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3">{currentTime}</Typography>
      <Typography color="primary.main" variant="h5">
        {date}
      </Typography>
    </Box>
  );
};

export default Clock;
