import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Paper, Link } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "axios";

export default function RecipePage(props) {
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
    <Container style={{ marginTop: "50px" }}>
      {recipe && (
        <Grid container>
          <Grid item xs={6}>
            <Paper>
              <Typography variant="h2" component="h2">
                {recipe.RecipeName}
              </Typography>
              <Typography variant="h4" component="h4" onClick={handleUserClick}>
                by: {recipe.Username}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Typography variant="h4" component="h4">
                {recipe.description}
              </Typography>
              <Typography variant="h5" component="h5">
                Time: {recipe.time}
              </Typography>
            </Paper>
          </Grid>
          {recipe.image_url ? (
            <img
              style={{ height: "300px" }}
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
