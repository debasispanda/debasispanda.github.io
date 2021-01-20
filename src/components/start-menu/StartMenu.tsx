import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SettingsIcon from "@material-ui/icons/Settings";
import { Tooltip } from "@material-ui/core";
import Profile from "../profile/Profile";
import Skill from "../skill/Skill";

import PowerOptionsDialog from "../power-options-dialog/PowerOptionsDialog";
import SettingsDialog from "../settings-dialog/SettingDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    windowPopoverContent: {
      padding: theme.spacing(1.5),
      display: "flex",
      height: "100%",
    },
    menuSidebar: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
    },
    menuApps: {
      flex: 3,
      overflow: "auto",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        width: 0,
        backgroundColor: "transparent",
      },
    },
    systemIcons: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
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
      <div className={classes.menuSidebar}>
        <Profile />
        <div className={classes.systemIcons}>
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
        <PowerOptionsDialog
          open={powerOptions}
          handleClose={closePowerOptions}
        />
        <SettingsDialog open={settings} handleClose={closeSettings} />
      </div>
      <div className={classes.menuApps}>
        <Skill />
      </div>
    </div>
  );
}
