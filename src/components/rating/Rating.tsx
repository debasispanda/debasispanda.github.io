import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    rating: {
      fill: "#ffdd2d",
    },
    emptyRating: {
      fill: "#aaa",
    },
  })
);

export default function Rating({ score }: { score: number }) {
  const classes = useStyles();
  const ratings = Array.from({ length: 5 }, (v, i) => i + 1).map((v) => {
    if (v <= score) {
      return { id: v, icon: StarIcon, className: classes.rating };
    }
    if (score < v && score > v - 1) {
      return { id: v, icon: StarHalfIcon, className: classes.rating };
    }
    return { id: v, icon: StarBorderIcon, className: classes.emptyRating };
  });

  return (
    <div>
      {ratings.map(({ id, icon: RatingIcon, className }) => (
        <RatingIcon key={id} className={className} />
      ))}
    </div>
  );
}
