import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Paper } from "@material-ui/core";
import axios from "axios";

export default function RecipePage(props) {
  const [recipe, setRecipe] = useState(null);
  const { id } = props.match.params;

  useEffect(() => {
    const getRecipe = async () => {
      const result = await axios.get(
        `https://ghywcwdod3.execute-api.us-east-2.amazonaws.com/dev/recipes/${id}`
      );
      console.log(result);
      setRecipe(result.data.body.Items[0]);
    };
    getRecipe();

    return setRecipe(null);
  }, [id]);

  return (
    <Container style={{ marginTop: "50px" }}>
      {recipe && (
        <Grid container>
          <Grid item xs={6}>
            <Paper>
              <Typography variant="h2" component="h2">
                {recipe.RecipeName}
              </Typography>
              <Typography variant="h4" component="h4">
                by: {recipe.Username}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}></Grid>
          <img
            style={{ height: "300px" }}
            src={recipe.image_url}
            alt={recipe.RecipeName}
          />
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              Ingredients:
            </Typography>
            <Paper>
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
            <Paper>
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
