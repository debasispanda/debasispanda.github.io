import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import GithubIcon from "@material-ui/icons/GitHub";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskBarIcon: {
      marginLeft: theme.spacing(2),
      textTransform: "none",
      color: "#fff",
      "& a": {
        textDecoration: "none",
        color: "#fff",
      },
    },
  })
);

export default function TaskbarShortcuts() {
  const classes = useStyles();

  const icons = [
    {
      icon: DesktopMacIcon,
      label: "Desktop",
      url: "/",
    },
    {
      icon: GithubIcon,
      label: "Github",
      url: "https://www.github.com/debasispanda",
      externalUrl: true,
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/imdebasispanda",
      externalUrl: true,
    },
    {
      icon: TwitterIcon,
      label: "Twitter",
      url: "https://www.twitter.com/imdebasispanda",
      externalUrl: true,
    },
  ];
  return (
    <>
      {icons.map(({ label, icon: TaskbarIcon, url, externalUrl }) => (
        <Tooltip title={label} key={url}>
          <IconButton className={classes.taskBarIcon}>
            {externalUrl ? (
              <a href={url} target="_blank" rel="noreferrer">
                <TaskbarIcon />
              </a>
            ) : (
              <Link to={url}>
                <TaskbarIcon />
              </Link>
            )}
          </IconButton>
        </Tooltip>
      ))}
    </>
  );
}
