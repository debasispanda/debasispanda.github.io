import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SettingsIcon from "@material-ui/icons/Settings";
import { Hidden, Tooltip } from "@material-ui/core";
import Profile from "../profile/Profile";
import Skill from "../skill/Skill";
import TaskbarTools from "../taskbar/TaskbarTools";

import PowerOptionsDialog from "../power-options-dialog/PowerOptionsDialog";
import SettingsDialog from "../settings-dialog/SettingDialog";
import Calendar from "../calendar/Calendar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    windowPopoverContent: {
      padding: theme.spacing(1.5),
      display: "grid",
      height: "100%",
      gridTemplateRows: "200px auto",
      gridTemplateColumns: "60px auto",
      gridTemplateAreas: '"profile profile" "systemIcons menuApps"',
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "60px auto 100px",
        gridTemplateAreas:
          '"profile profile calendar" "systemIcons menuApps menuApps"',
      },
    },
    profile: {
      gridArea: "profile",
    },
    menuApps: {
      overflow: "auto",
      gridArea: "menuApps",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        width: 0,
        backgroundColor: "transparent",
      },
      [theme.breakpoints.down("md")]: {},
    },
    systemIcons: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      gridArea: "systemIcons",
      padding: theme.spacing(0, 0.5),
      [theme.breakpoints.down("xs")]: {
        marginTop: "0",
        "& button": {
          padding: theme.spacing(1, 1.5),
        },
      },
    },
    calendarContainer: {
      gridArea: "calendar",
    },
  })
);

export default function StartMenu() {
  const classes = useStyles();

  const [powerOptions, setPowerOptions] = useState(false);
  const [settings, setSettings] = useState(false);

  const openSettings = () => {
    setSettings(true);
  };

  const closeSettings = () => {
    setSettings(false);
  };

  const openPowerOptions = () => {
    setPowerOptions(true);
  };

  const closePowerOptions = (value: "restart" | "shutdown" | "cancel") => {
    if (value === "restart") {
      window.location.reload();
    } else if (value === "shutdown") {
      window.open("about:blank", "_self");
      window.close();
    } else {
      setPowerOptions(false);
    }
  };

  return (
    <div className={classes.windowPopoverContent}>
      <div className={classes.profile}>
        <Profile />
      </div>
      <Hidden lgUp xsDown>
        <div className={classes.calendarContainer}>
          <Calendar />
        </div>
      </Hidden>
      <div className={classes.systemIcons}>
        <Hidden lgUp>
          <TaskbarTools />
        </Hidden>
        <Tooltip title="Settings" placement="right">
          <IconButton onClick={openSettings} aria-label="setting app">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Power" placement="right">
          <IconButton onClick={openPowerOptions} aria-label="close app">
            <PowerSettingsNewIcon />
          </IconButton>
        </Tooltip>
      </div>
      <PowerOptionsDialog open={powerOptions} handleClose={closePowerOptions} />
      <SettingsDialog open={settings} handleClose={closeSettings} />
      <div className={classes.menuApps}>
        <Skill />
      </div>
    </div>
  );
}
