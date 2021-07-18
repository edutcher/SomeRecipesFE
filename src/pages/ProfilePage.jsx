import React, { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import axios from "axios";

export default function ProfilePage(props) {
  const [userRecipes, setUserRecipes] = useState(null);
  const { username } = props.match.params;

  useEffect(() => {
    const getUserRecipes = async () => {
      try {
        const result = await axios.get(
          `https://ghywcwdod3.execute-api.us-east-2.amazonaws.com/dev/recipes/user/${username}`
        );
        if (result.status === 200) {
          setUserRecipes(result.data.Items);
        }
      } catch (error) {}
    };
    getUserRecipes();
  }, [username]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Typography
            variant="h2"
            component="h2"
            style={{ marginTop: "50px", marginBottom: "50px" }}
          >
            {username}'s Recipes:
          </Typography>
        </Grid>
        {userRecipes &&
          userRecipes.map((item) => {
            return (
              <RecipeCard
                key={item.id}
                name={item.RecipeName}
                description={item.description}
                imageUrl={item.image_url}
                username={item.Username}
                id={item.id}
              />
            );
          })}
      </Grid>
    </Container>
  );
}
