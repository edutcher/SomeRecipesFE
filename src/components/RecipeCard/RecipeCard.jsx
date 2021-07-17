import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { imageUrl, name, username, description, id } = props;
  const history = useHistory();

  const handleClick = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    history.push(`/recipe/${id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick} data-id={id} key={id}>
        <CardMedia
          className={classes.media}
          image={
            imageUrl
              ? imageUrl
              : "https://some-recipes.s3.us-east-2.amazonaws.com/images/katie-smith-uQs1802D0CQ-unsplash.jpg"
          }
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="span">
            by: {username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
