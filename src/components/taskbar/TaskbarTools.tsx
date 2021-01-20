import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { openFullscreen, exitFullScreen } from "../../fullScreen";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tools: {
      marginLeft: "auto",
    },
    toolIcon: {
      marginLeft: theme.spacing(2),
      textTransform: "none",
      color: "#fff",
      "& a": {
        textDecoration: "none",
        color: "#fff",
      },
    },
    info: {
      padding: theme.spacing(2),
    },
    infoTitle: {
      textAlign: "center",
    },
  })
);

export default function TaskbarTools() {
  const classes = useStyles();
  const [fullScreen, setFullScreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const hideInfo = () => {
    setShowInfo(false);
  };

  const icons = [
    {
      icon: fullScreen ? FullscreenExitIcon : FullscreenIcon,
      label: "Fullscreen",
      onClick: () => {
        if (fullScreen) {
          exitFullScreen().then(() => {
            setFullScreen(false);
          });
        } else {
          openFullscreen().then(() => {
            setFullScreen(true);
          });
        }
      },
    },
    {
      icon: InfoIcon,
      label: "Information",
      onClick: () => {
        setShowInfo(true);
      },
    },
  ];
  return (
    <>
      <div className={classes.tools}>
        {icons.map(({ onClick, label, icon: ToolIcon }) => (
          <Tooltip key={label} title={label} aria-label={label}>
            <IconButton onClick={onClick} className={classes.toolIcon}>
              <ToolIcon />
            </IconButton>
          </Tooltip>
        ))}
      </div>
      <Dialog
        aria-labelledby="info-dialog-title"
        open={showInfo}
        onClose={hideInfo}
      >
        <DialogTitle id="info-dialog-title" className={classes.infoTitle}>
          Information
        </DialogTitle>
        <div className={classes.info}>
          &copy; debasispanda.github.io {new Date().getFullYear()}
        </div>
      </Dialog>
    </>
  );
}
