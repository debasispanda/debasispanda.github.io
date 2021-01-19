import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ListAltIcon from "@material-ui/icons/ListAlt";

interface Props {
  open: boolean;
  handleClose: (value: "save" | "cancel") => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      textAlign: "center",
    },
  })
);

export default function SettingsDialog({ open, handleClose }: Props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["desktopShortcuts"]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="settings-dialog-title"
      aria-describedby="settings-dialog-description"
    >
      <DialogTitle id="settings-dialog-title" className={classes.title}>
        Settings
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText id="switch-dark-mode" primary="Dark Mode" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle("darkMode")}
                checked={checked.indexOf("darkMode") !== -1}
                inputProps={{ "aria-labelledby": "switch-dark-mode" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-desktop-shortcuts"
              primary="Desktop Shortcuts"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle("desktopShortcuts")}
                checked={checked.indexOf("desktopShortcuts") !== -1}
                inputProps={{
                  "aria-labelledby": "switch-desktop-shortcuts",
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <DialogContentText id="settings-dialog-description">
          Note: You can find all the settings for this application here but this
          is only client side and doesn&apos;t persist to server.
        </DialogContentText>
      </DialogContent>
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
            handleClose("save");
          }}
          color="primary"
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
