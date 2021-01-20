import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import {
  FaHtml5,
  FaDocker,
  FaSass,
  FaAngular,
  FaNodeJs,
  FaReact,
  FaPython,
} from "react-icons/fa";
import {
  SiJavascript,
  SiCss3,
  SiTypescript,
  SiMongodb,
  SiWebpack,
} from "react-icons/si";
import Rating from "../rating/Rating";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skills: {
      display: "flex",
      justifyContent: "left",
      padding: "10px",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
    widget: {
      width: "120px",
      height: "120px",
      backgroundColor: theme.palette.primary.light,
    },
    icon: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      fontSize: "4em",
    },
    score: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "4em",
      "& *": {
        fontSize: "0.6em",
      },
    },
  })
);

export default function Skill() {
  const classes = useStyles();
  const skills = [
    { label: "HTML5", score: 5, icon: FaHtml5 },
    { label: "CSS3", score: 5, icon: SiCss3 },
    { label: "JavaScript", score: 5, icon: SiJavascript },
    { label: "TypeScript", score: 5, icon: SiTypescript },
    { label: "Angular", score: 5, icon: FaAngular },
    { label: "NodeJs", score: 5, icon: FaNodeJs },
    { label: "React", score: 4, icon: FaReact },
    { label: "Python", score: 3.5, icon: FaPython },
    { label: "MongoDB", score: 3.5, icon: SiMongodb },
    { label: "Webpack", score: 4, icon: SiWebpack },
    { label: "SCSS", score: 4, icon: FaSass },
    { label: "Docker", score: 4, icon: FaDocker },
  ];
  return (
    <div className={classes.skills}>
      {skills.map(({ label, icon: SkillsIcon, score }) => (
        <div className="flip-box" key={label}>
          <div className={`${classes.widget} flip-box-inner`}>
            <div className={`${classes.icon} flip-box-front`}>
              <SkillsIcon />
            </div>
            <div className={`${classes.score} flip-box-back`}>
              <Rating score={score} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
