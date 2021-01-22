import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import SearchBox from "../search/Searchbox";
import Calendar from "../calendar/Calendar";
import TaskbarShortcuts from "./TaskbarShortcuts";
import Start from "../start/Start";
import TaskbarTools from "./TaskbarTools";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 0,
      backgroundColor: "rgba(46, 46, 46, 1)",
      "& > div": {
        [theme.breakpoints.up("lg")]: {
          paddingLeft: "28px",
        },
      },
    },
  })
);

export default function Taskbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Start />
        <Hidden mdDown>
          <SearchBox />
          <TaskbarShortcuts />
          <TaskbarTools />
          <Calendar />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
