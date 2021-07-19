import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Container, Typography, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  cont: {
    marginTop: theme.spacing(5),
  },
  paper: {
    display: "inline-block",
    marginBottom: theme.spacing(5),
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}));

export default function RecipePage(props) {
  const classes = useStyles();
  const [recipe, setRecipe] = useState(null);
  const { id } = props.match.params;
  const history = useHistory();

  useEffect(() => {
    const getRecipe = async () => {
      const result = await axios.get(
        `https://ghywcwdod3.execute-api.us-east-2.amazonaws.com/dev/recipes/${id}`
      );
      setRecipe(result.data.body.Items[0]);
    };
    getRecipe();

    return setRecipe(null);
  }, [id]);

  const handleUserClick = () => {
    history.push(`/profile/${recipe.Username}`);
  };

  return (
    <Container className={classes.cont}>
      {recipe && (
        <Grid container>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h2" component="h2">
                {recipe.RecipeName}
              </Typography>
              <Typography variant="h4" component="h4" onClick={handleUserClick}>
                by: {recipe.Username}
              </Typography>
              <Typography variant="h6" component="h6">
                {recipe.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h5">
                Time: {recipe.time} minutes
              </Typography>
            </Paper>
          </Grid>
          {recipe.image_url ? (
            <img
              style={{ height: "300px", marginBottom: "50px" }}
              src={recipe.image_url}
              alt={recipe.RecipeName}
            />
          ) : (
            ""
          )}
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              Ingredients:
            </Typography>
            <Paper className={classes.paper}>
              <ul>
                {recipe.ingredients.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              Directions:
            </Typography>
            <Paper className={classes.paper}>
              <ul>
                {recipe.directions.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
