import React from "react";
import {
  Typography,
  List,
  ListItem,
  Box,
  Grid,
  ListItemText,
} from "@material-ui/core";

export default function ReviewArea(props) {
  const {
    title,
    description,
    ingredients,
    directions,
    totalTime,
    category,
    photoBlob,
  } = props;

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Typography variant="h3" component="h3">
            Title: {title}
          </Typography>
          <Typography variant="h4" component="h4">
            Category: {category}
          </Typography>
          <Typography variant="subtitle1" component="span">
            Time: {totalTime} Minutes
          </Typography>
          <Typography variant="subtitle2" component="p">
            Description: {description}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <img
            style={{ width: "100%" }}
            src={window.URL.createObjectURL(photoBlob)}
            alt={title}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" component="h5">
            Ingredients:
          </Typography>
          <List>
            {ingredients.map((item) => (
              <ListItem>
                {" "}
                <ListItemText primary={item} />{" "}
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" component="h5">
            Directions:
          </Typography>
          <List>
            {directions.map((item) => (
              <ListItem>
                {" "}
                <ListItemText primary={item} />{" "}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
