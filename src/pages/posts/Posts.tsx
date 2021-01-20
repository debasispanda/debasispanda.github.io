import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Divider, Typography } from "@material-ui/core";
import Explorer from "../../components/explorer/Explorer";

const useStyles = makeStyles(() =>
  createStyles({
    page: {},
    heading: {
      textAlign: "center",
    },
  })
);

export default function Posts() {
  const classes = useStyles();
  return (
    <Explorer explorerTitle="Posts" url="/posts">
      <div className={classes.page}>
        <Typography variant="h3" className={classes.heading} component="h1">
          Posts
        </Typography>
        <Divider />
      </div>
    </Explorer>
  );
}
