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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3">{date}</Typography>
      <Typography color="primary.main" variant="h6">
        {currentTime}
      </Typography>
    </Box>
  );
};

export default Clock;
