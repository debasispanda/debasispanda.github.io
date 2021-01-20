import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      marginTop: "auto",
      padding: "10px",
      textAlign: "center",
    },
  })
);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      &copy; debasispanda.github.io {new Date().getFullYear()}
    </footer>
  );
}
