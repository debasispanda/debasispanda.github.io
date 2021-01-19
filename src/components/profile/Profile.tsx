import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Avatar from "@material-ui/core/Avatar";
import avatarImg from "../../assets/profile.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarContainer: {
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      marginRight: theme.spacing(3),
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    userName: {
      whiteSpace: "nowrap",
      fontSize: "2em",
    },
  })
);

export default function Profile() {
  const classes = useStyles();

  const details = [
    {
      icon: EmailIcon,
      label: "imdebasispanda@gmail.com",
      type: "link",
    },
    {
      icon: CallIcon,
      label: "+91-7799659701",
      type: "tel",
    },
    {
      icon: LocationOnIcon,
      label: "Madhapur, Hyderabad, India",
      type: "location",
    },
  ];

  return (
    <>
      <div className={classes.avatarContainer}>
        <Avatar
          alt="Debasis Panda"
          src={avatarImg}
          className={classes.avatar}
        />
        <span className={classes.userName}>Debasis Panda</span>
      </div>
      <Divider />
      <List>
        {details.map(({ label, type, icon: ListIcon }) => (
          <ListItem button key={label}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText>
              {type === "link" ? (
                <a href={`mailto:${label}`}>{label}</a>
              ) : type === "tel" ? (
                <a href={`tel:${label}`}>{label}</a>
              ) : (
                <>{label}</>
              )}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}
