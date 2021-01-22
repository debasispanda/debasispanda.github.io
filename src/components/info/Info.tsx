import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoItem: {
      padding: theme.spacing(0, 3),
    },
  })
);

export default function Info() {
  const classes = useStyles();
  return (
    <div>
      <p className={classes.infoItem}>
        &copy; {new Date().getFullYear()} debasispanda.github.io All Rights
        Reserved
      </p>
      <p className={classes.infoItem}>
        This web site created using{" "}
        <a href="https://create-react-app.dev" target="_blank" rel="noreferrer">
          create-react-app
        </a>
      </p>
    </div>
  );
}
