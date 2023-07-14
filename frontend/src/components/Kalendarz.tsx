import {
  Box,
  Card,
  CardContent,
  Fade,
  Modal,
  Typography,
  List,
  FormControl,
  Input,
  Button,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useState, useRef, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import axios from "axios";
import Event from "./Kalendarz/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Kalendarz = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var dayClicked = false;
  var firstOpenning = false;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.default",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    display: "flex",
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());

  const [value, setValue] = useState<any | null>(dayjs());

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <FiberManualRecordIcon fontSize="small" color="primary" />
          ) : undefined
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/calendar`);
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
        if (
          dayjs(day.date).year() == currentDate.year() &&
          dayjs(day.date).month() === currentDate.month()
        ) {
          currentMarks.push(dayjs(day.date).date());
        }
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setHighlightedDays(currentMarks);
    setIsLoading(false);
  };

  useEffect(() => {
    handleMonthChange(value);
  }, [dayClicked]);

  const handleDayChange = async (date: Dayjs) => {
    dayClicked = !dayClicked;
    setValue(date);
    setSelectedMonth(date);
    // setIsLoading(true);
    setDayEvents([]);
    setEvents([]);
    var tmpEvents = [];
    await fetchEvents();
    try {
      events.map((day) => {
        if (
          dayjs(day.date).year() == date.year() &&
          dayjs(day.date).month() === date.month() &&
          dayjs(day.date).date() === date.date()
        ) {
          tmpEvents.push(day);
        }
      });
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
    // setIsLoading(false);
    await setDayEvents(tmpEvents);

    if (!firstOpenning) {
      firstOpenning = !firstOpenning;
      handleMonthChange(date);
    }
  };
  useEffect(() => {
    handleDayChange();
  }, [firstOpenning]);

  // ************************************
  // FORM TO SEND EVENT
  // ************************************

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const handleToast = () => {
    setToastOpen(true);
  };

  useEffect(() => {
    console.log(localStorage.getItem("email"));
    setAuthor(localStorage.getItem("name").slice(1, -1));
  }, []);

  const typingHandlerTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const typingHandlerText = (e: any) => {
    setText(e.target.value);
    //console.log(text);
  };

  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  const addEvent = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          // Authorization: `Bearer ${user.token}`, //to do
        },
      };
      console.log(author);

      const { data } = await axios.post(
        "http://localhost:5000/api/calendar",
        {
          author: author,
          title: title,
          eventText: text,
          date: value,
        },
        config
      );

      if (input1Ref.current) {
        input1Ref.current.value = "";
      }

      if (input2Ref.current) {
        input2Ref.current.value = "";
      }
      console.log(dayEvents);
      await setDayEvents(dayEvents.push(data));
      console.log(dayEvents);
      dayEvents.map((eve) => {
        console.log(eve.title);
        console.log(eve.date);
        console.log(eve.author);
        console.log(eve.eventText);
      });

      // setMessage("Dodano wydarzenie!");
      // handleToast();
      // setAnnouncements([...announcements, data]); //to do
    } catch (error) {
      // setMessage("Wystąpił błąd!");
      // handleToast();
    }

    handleDayChange(value);
    handleMonthChange(value);
    firstOpenning = !firstOpenning;
  };

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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection={{ xl: "row", sm: "column" }}
          >
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
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.default",
              borderRadius: 5,
              boxShadow: 24,
              p: 4,
              display: "flex",
            }}
            width={{ xl: "90vw", sm: "70vw" }}
            flexDirection={{ xl: "row", sm: "column" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="landscape"
                defaultValue={dayjs()}
                loading={isLoading}
                onChange={handleDayChange}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />} // BADGES TO BE FIXED.
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  } as any,
                }}
              />
            </LocalizationProvider>
            <List
              sx={{
                overflowY: "scroll",
                "&::-webkit-scrollbar": { display: "none" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "30%",
                height: "60vh",
              }}
            >
              {/* {value?.date()} */}
              {
                // TO DO:
                // IF no events disp: no events...
                dayEvents.map((eve) => {
                  return (
                    <Event
                      title={eve.title}
                      data={eve.date}
                      user={eve.author}
                      text={eve.eventText}
                    />
                  );
                })
              }
            </List>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "30%",
              }}
            >
              <Box
                mb={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CalendarMonthIcon fontSize="large" color="primary" />
                <Typography textAlign="center" ml={1} variant="h4">
                  Dodaj wydarzenie
                </Typography>
              </Box>
              <FormControl fullWidth={true}>
                <Input
                  placeholder="Title..."
                  onChange={typingHandlerTitle}
                  sx={{ marginBottom: 2 }}
                  inputRef={input1Ref}
                />
                <Input
                  placeholder="Event text..."
                  onChange={typingHandlerText}
                  multiline={true}
                  sx={{ marginBottom: 2, textAlign: "center" }}
                  inputRef={input2Ref}
                />
                Wybrana data: {value ? value?.date() : "-"}/
                {value ? value?.month() + 1 : "-"}/{value ? value?.year() : "-"}
                <Button
                  sx={{ marginTop: 2 }}
                  variant="contained"
                  onClick={addEvent}
                >
                  Dodaj
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Kalendarz;
