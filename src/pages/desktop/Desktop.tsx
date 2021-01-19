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
      height: "100%",
      padding: theme.spacing(3),
    },
    linkedinWidget: {
      position: "fixed",
      top: "15px",
      right: "15px",
    },
  })
);

export default function Desktop() {
  const classes = useStyles();

  return (
    <div className={classes.desktop}>
      <Shortcuts />
      <Help />
      {/* <a className="twitter-timeline" data-width="500" data-height="800" data-dnt="true" href="https://twitter.com/imdebasispanda?ref_src=twsrc%5Etfw">Tweets by imdebasispanda</a>
      <div className={'LI-profile-badge ' + classes.linkedinWidget} data-version="v1" data-size="medium" data-locale="en_US" data-type="horizontal" data-theme="dark" data-vanity="imdebasispanda">
        <a className="LI-simple-link" href='https://in.linkedin.com/in/imdebasispanda?trk=profile-badge'>Debasis Panda</a>
      </div> */}
    </div>
  );
}
