import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import { IoLogoWindows } from "react-icons/io";
import Popover from "@material-ui/core/Popover";
import { Tooltip } from "@material-ui/core";
import StartMenu from "../start-menu/StartMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    start: {
      [theme.breakpoints.down("md")]: {
        margin: "auto",
      },
    },
    windowPopover: {
      "& .MuiPaper-root": {
        left: "0 !important",
        bottom: "64px !important",
        top: "auto !important",
        borderRadius: 0,
        width: "50%",
        height: "60%",
        backgroundColor: "rgba(46, 46, 46, 1)",
        boxShadow: "2px -2px 7px 0 rgba(0, 0, 0, 0.3)",
        "& *": {
          color: "#fff",
        },
        [theme.breakpoints.down("md")]: {
          width: "100%",
          maxWidth: "100%",
          height: "calc(100% - 64px)",
        },
        [theme.breakpoints.down("sm")]: {
          height: "calc(100% - 56px)",
          bottom: "56px !important",
        },
      },
    },
  })
);

export default function Start() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.start} id="start">
      <Tooltip title="Start">
        <IconButton
          aria-describedby={id}
          edge="start"
          color="inherit"
          onClick={handleClick}
          aria-label="open popover"
        >
          <SvgIcon>
            <IoLogoWindows />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.windowPopover}
      >
        <StartMenu />
      </Popover>
    </div>
  );
}
