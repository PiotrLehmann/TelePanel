import { Box, Card, CardContent, Fade, Modal, Typography, List } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useState, useRef, useEffect } from "react";
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import axios from "axios";
import Event from "./Kalendarz/Event";


const Kalendarz = () => {
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
    display:"flex",
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());

  const [value, setValue] = useState<any | null>(dayjs());
  
  function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
    
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    console.log(highlightedDays);
    
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '🌚' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }
  

  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [events, setEvents] = useState([]);
  // const [dayEevents, setDayEvents] = useState([]);

  var dayEvents = events;
  // var dayEvents = [];


  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/calendar`
      );
      await setEvents(data);
      console.log(data);
    } catch (error) {
      // toast({  TU DODAC SNACKBARA !!!!!!!!!!!!!!!!!!
      //   title: "Error Occured!",
      //   description: error.message,
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  
    const handleMonthChange = (currentDate: Dayjs) => {
      if (requestAbortController.current) {
        requestAbortController.current.abort();
      }
      
      setSelectedMonth(currentDate); // nie miesiac to ale zaraz
      setHighlightedDays([]);
      setIsLoading(true);
      fetchEvents();
      let currentMarks = [];
      try {
        events.map((day) => {
          if ( ( dayjs(day.date).year() == selectedMonth.year() ) && ( dayjs(day.date).month()   === selectedMonth.month() ) ) {
            currentMarks.push(dayjs(day.date).date())
          }
        })
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } 
      setHighlightedDays(currentMarks);
      setIsLoading(false);
    };

    useEffect(() => {
      handleMonthChange();
    }, []);

    const handleDayChange = (date: Dayjs) => {
      setValue(date)
      setSelectedMonth(date);
      setIsLoading(true);
      // dayEvents=[];
      setEvents([]);
      console.log("--------------------------------------------");
      console.log(events.date);
      
      console.log(events);
      console.log(dayEvents);
      console.log(selectedMonth);
      console.log(value);
      
      fetchEvents();
      try {
        events.map((day) => {
          console.log(day);
          console.log(selectedMonth);
          console.log(dayjs(day.date).year() == value.year());
          console.log(dayjs(day.date).month()   === value.month());
          console.log(dayjs(day.date).date()   === value.date());
          console.log(dayjs(day.date).date());
          console.log(value.date());
          if ( ( dayjs(day.date).year() == value.year() ) && ( dayjs(day.date).month()   === value.month() ) && ( dayjs(day.date).date()   === value.date() ) ) {
            console.log(day);
            console.log("IN LOOOOOP");
            console.log(day);
            
            dayEvents.push(day);
            console.log(dayEvents);
            
          }
        })
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } 
      setIsLoading(false);
      console.log("SPLITTER ###############");
      
      console.log(events);
      console.log(dayEvents.length);
      
      
    }
    // useEffect(() => {
    //   handleDayChange();
    // }, [dayEvents]);

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
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <CalendarMonthOutlinedIcon fontSize="large" color="primary" />
            <Typography ml={1} sx={{ fontSize: "170%" }}>
              Kalendarz
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker 
              orientation="landscape" 
              defaultValue={dayjs()} 
              loading={isLoading}
              onChange={handleDayChange}
              onMonthChange={handleMonthChange}
              // renderLoading={() => <DayCalendarSkeleton />}      // BADGES TO BE FIXED.
              // slots={{
              //   day: ServerDay,
              // }}
              // slotProps={{
              //   day: {
              //     highlightedDays,
              //   } as any,
              // }} 
              />
            </LocalizationProvider>
          <List sx={{
                        overflowY: "scroll",
                        "&::-webkit-scrollbar": { display: "none" },
                        height: "75vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
            { value?.year() };
            { value?.month() };
            { value?.date() };
            {dayEvents.length}
            -----------------,,,
            {value?.format()};
            ____________________
            {dayjs('2018-07-18T21:17:02+02:00').format() /* zwaraca to samo */ } 
            {dayEvents.map((eve) => {
                  //   console.log("HALO");
                  // console.log(events);
                  // console.log(dayEvents);
                  
                  
                  return (
                    <Event
                    title={eve.title}
                    data={eve.date}
                    user={eve.author}
                    text={eve.eventText}
                    />
                  );
                // }
              })
            }
            </List>
            
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Kalendarz;
