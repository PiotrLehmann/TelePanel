import { Box, Card, CardContent, Fade, Modal, Typography } from "@mui/material";
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
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null);
  console.log(selectedDate);

  function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        console.log(date.month());
        
        const daysToHighlight = [1, 2, 3];
  
        resolve({ daysToHighlight });
      }, 500);
  
      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
  }
  
  function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
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
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  
    const fetchHighlightedDays = (date: Dayjs) => {
      const controller = new AbortController();
      fakeFetch(date, {
        signal: controller.signal,
      })
        .then(({ daysToHighlight }) => {
          setHighlightedDays(daysToHighlight);
          setIsLoading(false);
        })
        .catch((error) => {
          // ignore the error if it's caused by `controller.abort`
          if (error.name !== 'AbortError') {
            throw error;
          }
        });
  
      requestAbortController.current = controller;
    };
  
    useEffect(() => {
      fetchHighlightedDays(dayjs());
      // abort request on unmount
      return () => requestAbortController.current?.abort();
    }, []);
  
    const handleMonthChange = (date: Dayjs) => {
      if (requestAbortController.current) {
        // make sure that you are aborting useless requests
        // because it is possible to switch between months pretty quickly
        requestAbortController.current.abort();
      }
      
      setSelectedMonth(date);
      setIsLoading(true);
      setHighlightedDays([]);
      fetchHighlightedDays(date);
    };

    const handleDayChange = (date: Dayjs) => {
      if (requestAbortController.current) {
        // make sure that you are aborting useless requests
        // because it is possible to switch between months pretty quickly
        requestAbortController.current.abort();
      }
      
      setSelectedMonth(date);
      setIsLoading(true);
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
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                } as any,
              }} />
            </LocalizationProvider>
          <Box  width={{ xl: "10vw", sm: "10vw" }} >
            { selectedMonth?.year() };
            { selectedMonth?.month() };
            { selectedMonth?.day() };
          </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Kalendarz;
