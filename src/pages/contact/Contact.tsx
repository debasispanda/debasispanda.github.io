import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Divider, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Explorer from "../../components/explorer/Explorer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      textAlign: "center",
      margin: theme.spacing(2, 0),
    },
    page: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    form: {
      margin: "auto",
      width: "100%",
    },
  })
);

export default function Contact() {
  const classes = useStyles();

  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleOnLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <Explorer explorerTitle="Contact" url="/contact">
      <div className={classes.page}>
        <Typography variant="h3" className={classes.heading} component="h1">
          Contact
        </Typography>
        <Divider />
        {!iframeLoaded && <LinearProgress />}
        <iframe
          onLoad={handleOnLoad}
          title="contact form"
          className={classes.form}
          src="https://docs.google.com/forms/d/e/1FAIpQLSf9tE1Y7BUagG9VJi5q_G1-A9Gwb43mdps3xmasM0iSITpXuA/viewform?embedded=true"
          width="640"
          height="720"
          frameBorder="0"
        >
          Loading…
        </iframe>
      </div>
    </Explorer>
  );
}
