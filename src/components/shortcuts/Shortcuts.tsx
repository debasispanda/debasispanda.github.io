import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import GithubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shortcuts: {},
    shortcut: {
      display: "flex",
      width: "50px",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: theme.spacing(3),
      cursor: "pointer",
      "& svg": {
        fontSize: "2em !important",
      },
    },
  })
);

export default function Shortcuts() {
  const history = useHistory();

  const shortcuts = [
    {
      label: "Profile",
      icon: AccountCircleIcon,
      url: "/profile",
    },
    {
      label: "Contact",
      icon: EmailIcon,
      url: "/contact",
    },
    {
      icon: GithubIcon,
      label: "Github",
      url: "https://www.github.com/debasispanda",
      external: true,
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/imdebasispanda",
      external: true,
    },
    {
      icon: TwitterIcon,
      label: "Twitter",
      url: "https://www.twitter.com/imdebasispanda",
      external: true,
    },
  ];

  const classes = useStyles();
  const onDoubleClick = (url: string, external: boolean | undefined) => {
    if (external) {
      window.open(url);
    } else {
      history.push(url);
    }
  };

  return (
    <div className={classes.shortcuts} id="shortcuts">
      {shortcuts.map(({ label, url, external, icon: ShortcutIcon }) => (
        <div
          key={label}
          className={classes.shortcut}
          onDoubleClick={() => {
            onDoubleClick(url, external);
          }}
        >
          <IconButton>
            <ShortcutIcon />
          </IconButton>{" "}
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
