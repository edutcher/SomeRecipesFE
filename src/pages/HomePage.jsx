import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Container } from "@material-ui/core";
import RecipeCard from "../components/RecipeCard/RecipeCard";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const result = await axios.get(
        "https://ghywcwdod3.execute-api.us-east-2.amazonaws.com/dev/recipes"
      );
      setRecipes(result.data.body.Items);
    };
    try {
      getRecipes();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Container>
        <Grid container>
          {recipes ? (
            recipes.map((recipe) => (
              <RecipeCard
                name={recipe.RecipeName}
                description={recipe.description}
                imageUrl={recipe.image_url}
                username={recipe.Username}
              />
            ))
          ) : (
            <h1>Home</h1>
          )}
        </Grid>
      </Container>
    </div>
  );
}
