import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Popover, { PopoverOrigin } from "@material-ui/core/Popover/Popover";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

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
  position: { left: number; top: number };
  origin: PopoverOrigin;
  description: string;
}

export default function Help() {
  const classes = useStyles();

  const needHelp = !localStorage.getItem("needHelp");

  const height: number = document.querySelector("body")?.clientHeight || 0;
  const width: number = document.querySelector("body")?.clientWidth || 0;

  const helpItems: HelpData[] = [
    {
      position: { left: 100, top: 50 },
      origin: { vertical: "top", horizontal: 100 },
      description: "Shortcuts: Double click these icons to launch.",
    },
    {
      position: { left: 50, top: height - 50 },
      origin: { vertical: "bottom", horizontal: 100 },
      description: "Start Menu: Click the start button to launch",
    },
    {
      position: { left: 350, top: height - 200 },
      origin: { vertical: "bottom", horizontal: 100 },
      description: "Taskbar: Click on icon to launch",
    },
    {
      position: { left: width - 50, top: height - 200 },
      origin: { vertical: "bottom", horizontal: "right" },
      description:
        "Fullscreen & calendar: Toggle fullscreen and launch calendar with datetime ",
    },
  ];

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

  return (
    <>
      {show && (
        <Backdrop className={classes.backdrop} open={open}>
          <Popover
            anchorReference="anchorPosition"
            open={open}
            anchorPosition={help.position}
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
