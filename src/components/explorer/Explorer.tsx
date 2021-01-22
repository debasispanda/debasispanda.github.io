import React, { ReactNode, KeyboardEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import AppBar from "@material-ui/core/AppBar";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    explorer: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ddd",
    },
    explorerTitle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: theme.spacing(0.5, 1),
    },
    titleIcons: {},
    titleLabel: {},
    explorerContent: {
      flexGrow: 1,
      backgroundColor: "#fff",
      width: "960px",
      margin: "auto",
      overflowY: "auto",
      padding: theme.spacing(4, 6),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: theme.spacing(2, 3),
      },
    },
    close: {
      fill: "red",
      cursor: "pointer",
    },
    addressBar: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        width: "500px",
      },
      "& *": {
        color: "#fff",
        borderColor: "#fff !important",
      },
      "& input": {
        padding: theme.spacing(0.5, 1),
      },
    },
  })
);

interface Props {
  explorerTitle: string;
  children: ReactNode;
  url: string;
}

export default function Explorer({ explorerTitle, url, children }: Props) {
  const classes = useStyles();

  const history = useHistory();

  const handleClose = () => {
    history.push("/");
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && e.currentTarget.value) {
      history.push(e.currentTarget.value);
    }
  };

  return (
    <div className={classes.explorer}>
      <AppBar position="static" className={classes.explorerTitle}>
        <div className={classes.titleLabel}>{explorerTitle}</div>
        <TextField
          type="text"
          className={classes.addressBar}
          variant="outlined"
          defaultValue={url}
          InputProps={{ onKeyUp: handleKeyUp }}
        />
        <div className={classes.titleIcons}>
          <CancelIcon className={classes.close} onClick={handleClose} />
        </div>
      </AppBar>
      <div className={classes.explorerContent}>{children}</div>
    </div>
  );
}
