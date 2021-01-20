import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

interface Props {
  open: boolean;
  handleClose: (value: "restart" | "shutdown" | "cancel") => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      textAlign: "center",
    },
  })
);

export default function PowerOptionsDialog({ open, handleClose }: Props) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="power-dialog-title"
    >
      <DialogTitle id="power-dialog-title" className={classes.title}>
        Power Off
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose("cancel");
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose("shutdown");
          }}
          color="primary"
          autoFocus
        >
          Shut Down
        </Button>
        <Button
          onClick={() => {
            handleClose("restart");
          }}
          color="primary"
          autoFocus
        >
          Restart
        </Button>
      </DialogActions>
    </Dialog>
  );
}
