import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover/Popover";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import withWidth, { WithWidth } from "@material-ui/core/withWidth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helpPopover: {
      "& p": {
        padding: theme.spacing(1, 2),
        marginBottom: theme.spacing(2),
      },
    },
    helpActions: {
      padding: theme.spacing(1, 2),
      display: "flex",
      justifyContent: "space-between",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

interface HelpData {
  position: { vertical: number; horizontal: number };
  anchorEl: string;
  description: string;
}

function Help({ width }: WithWidth) {
  const classes = useStyles();

  const needHelpConfig = localStorage.getItem("needHelp");
  let needHelp: boolean;

  if (needHelpConfig === null) {
    needHelp = true;
  } else {
    needHelp = JSON.parse(needHelpConfig);
  }

  const helpItems: HelpData[] = [
    {
      anchorEl: "#shortcuts",
      position: { horizontal: 100, vertical: 50 },
      description: "Shortcuts: Double click these icons to launch.",
    },
    {
      anchorEl: "#start",
      position: { horizontal: 0, vertical: -150 },
      description: "Start Menu: Click the start button to launch",
    },
    {
      anchorEl: "#launchers",
      position: { horizontal: 0, vertical: -150 },
      description: "Taskbar: Click on icon to launch",
    },
    {
      anchorEl: "#calendar",
      position: { horizontal: -50, vertical: -150 },
      description:
        "Fullscreen & calendar: Toggle fullscreen and launch calendar with datetime ",
    },
  ];

  if (!["lg", "xl"].includes(width)) {
    helpItems.splice(2, 2);
  }

  const [open, setOpen] = useState(needHelp);

  const [step, setStep] = useState(0);

  const [help, setHelp] = useState(helpItems[step]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(needHelp);
    }, 2000);
  }, [needHelp]);

  const hideHelp = () => {
    setOpen(false);
    setShow(false);
    localStorage.setItem("needHelp", "false");
  };

  const handleClick = () => {
    if (step < helpItems.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setHelp(helpItems[nextStep]);
    } else {
      hideHelp();
    }
  };

  const anchorEl = (selector: string) => {
    return document.querySelector(selector) as Element;
  };

  return (
    <>
      {show && (
        <Backdrop className={classes.backdrop} open={open}>
          <Popover
            anchorEl={anchorEl(help.anchorEl)}
            anchorReference="anchorEl"
            open={open}
            anchorOrigin={help.position}
          >
            <div className={classes.helpPopover}>
              <p>{help.description}</p>
              <Divider />
              <div className={classes.helpActions}>
                <Button color="primary" onClick={hideHelp}>
                  SKIP
                </Button>
                <Button color="primary" onClick={handleClick}>
                  OK
                </Button>
              </div>
            </div>
          </Popover>
        </Backdrop>
      )}
    </>
  );
}

export default withWidth()(Help);
