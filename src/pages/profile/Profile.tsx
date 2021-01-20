import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Divider, Theme, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Explorer from "../../components/explorer/Explorer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      padding: theme.spacing(4, 6),
      boxSizing: "border-box",
      width: "800px",
      margin: "auto",
      cursor: "text",
    },
    heading: {
      textAlign: "center",
      marginBottom: theme.spacing(3),
    },
    code: {
      fontSize: theme.spacing(3),
      margin: theme.spacing(0, 0.5),
    },
    divider: {
      marginBottom: theme.spacing(3),
    },
    para: {
      fontSize: theme.spacing(3),
    },
  })
);

const Codes = () => {
  const classes = useStyles();
  const values: string[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "Angular",
    "React",
    "TypeScript",
    "NodeJS",
    "Python",
  ];
  return (
    <>
      {values.map((val: string) => (
        <Chip key={val} label={val} className={classes.code} />
      ))}
    </>
  );
};

export default function Profile() {
  const classes = useStyles();
  return (
    <Explorer explorerTitle="Profile" url="/profile">
      <div className={classes.page}>
        <Typography variant="h3" className={classes.heading} component="h1">
          About Me
        </Typography>
        <Divider className={classes.divider} />
        <p className={classes.para}>
          Hi, I am Debasis and a software developer by profession. I use
          <Codes /> etc. in my programming. I always look for learning new stuff
          and keep myself updated.
        </p>
        <p className={classes.para}>
          Apart from my work like, I love travelling and mostly on roadtrips. I
          am good on cooking Indian cuisines and like watching action movies.
        </p>
        <p className={classes.para}>
          You will find me on LinkedIn and Twitter. Use the icons on taskbar.
        </p>
        <span className="blinking-cursor">|</span>
      </div>
    </Explorer>
  );
}
