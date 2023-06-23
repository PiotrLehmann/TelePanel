import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
// import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import FilterDramaOutlinedIcon from "@mui/icons-material/FilterDramaOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import { BedtimeOutlined } from "@mui/icons-material"; //CHANGE: BedtimeOutlinedIcon -> BedtimeOutlined

const Weather = () => {
  const [location, setLocation] = useState<string>();
  const [icon, setIcon] = useState<string>();
  const [temperature, setTemperature] = useState<number>();

  useEffect(function async() {
    fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Krakow?unitGroup=us&key=S2FLT492G5N5EX6P2L7ASHGJ6&contentType=json",
      {
        method: "GET",
        headers: {},
      }
    )
      .then((response) =>
        console.log(
          response.json().then((data) => {
            setLocation(data.address);
            setIcon(data.currentConditions.icon);
            setTemperature(
              Math.round(((data.currentConditions.temp - 32) / 1.8) * 10) / 10
            );
            console.log(data);
          })
        )
      )
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {
        {
          // snow: <AcUnitOutlinedIcon fontSize="large" color="primary" />,
          rain: <WaterDropOutlinedIcon fontSize="large" color="primary" />,
          fog: <WaterDropOutlinedIcon fontSize="large" color="primary" />,
          // wind: <AirOutlinedIcon fontSize="large" color="primary" />,
          cloudy: <FilterDramaOutlinedIcon fontSize="large" color="primary" />,
          "partly-cloudy-day": (
            <FilterDramaOutlinedIcon fontSize="large" color="primary" />
          ),
          "partly-cloudy-night": (
            <NightsStayOutlinedIcon fontSize="large" color="primary" />
          ),
          "clear-day": <WbSunnyOutlinedIcon fontSize="large" color="primary" />,
          "clear-night": (
            <BedtimeOutlined fontSize="large" color="primary" /> //CHANGE: BedtimeOutlinedIcon -> BedtimeOutlined
          ),
        }[icon!]
      }

      <Typography>{temperature} &deg;C</Typography>
      <Typography>{location}</Typography>
    </Box>
  );
};

export default Weather;
