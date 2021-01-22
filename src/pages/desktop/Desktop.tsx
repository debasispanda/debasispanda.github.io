import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import wallpaper from "../../assets/default_wallpaper.jpg";
import Shortcuts from "../../components/shortcuts/Shortcuts";
import Help from "../../components/help/Help";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    desktop: {
      display: "flex",
      background: `url(${wallpaper}) no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100%",
      padding: theme.spacing(3),
    },
  })
);

export default function Desktop() {
  const classes = useStyles();

  return (
    <div className={classes.desktop}>
      <Shortcuts />
      <Help />
    </div>
  );
}
