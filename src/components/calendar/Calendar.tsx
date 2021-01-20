import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const useStyles = makeStyles(() =>
  createStyles({
    calendar: {
      "& *": {
        color: "#fff !important",
        textAlign: "right",
        outline: "none !important",
        "& *:before": {
          border: "none !important",
        },
      },
    },
    picker: {
      width: 0,
    },
  })
);

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    setInterval(() => {
      setSelectedDate(new Date());
    }, 1000);
  }, []);

  const classes = useStyles();

  const util = new DateFnsUtils();

  const time = util.format(selectedDate, "HH:mm a");
  const date = util.format(selectedDate, "dd/MM/yyyy");

  return (
    <div className={classes.calendar}>
      <Button onClick={() => setIsOpen(true)}>
        {time} <br /> {date}{" "}
      </Button>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          variant="inline"
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          value={selectedDate}
          onChange={handleDateChange}
          className={classes.picker}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
