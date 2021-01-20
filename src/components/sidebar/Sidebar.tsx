import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import Profile from "../profile/Profile";
import Skill from "../skill/Skill";
import Footer from "../footer/Footer";

const drawerWidth = "25%";

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

export default function Sidebar() {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Profile />
      <Divider />
      <Skill />
      <Divider />
      <Footer />
    </Drawer>
  );
}
