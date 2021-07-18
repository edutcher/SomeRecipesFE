import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import axios from "axios";

export default function SearchPage(props) {
  const { category } = props.match.params;
  const [searchResults, setSearchResults] = useState(null);
  const [searchErr, setSearchErr] = useState(false);

  useEffect(() => {
    const doSearch = async () => {
      try {
        const result = await axios.post(
          `https://ghywcwdod3.execute-api.us-east-2.amazonaws.com/dev/recipes/category/${category}`
        );
        console.log(result);
        if (result.status === 200) {
          setSearchResults(result.data.Items);
          setSearchErr(false);
        }
      } catch (error) {
        setSearchResults(null);
        setSearchErr(true);
      }
    };
    console.log(category);
    doSearch();
  }, [category]);

  return (
    <Container>
      <Grid container>
        {searchResults &&
          searchResults.map((item) => {
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
        {searchErr ? (
          <Typography variant="h3" component="h3">
            No results found
          </Typography>
        ) : (
          ""
        )}
      </Grid>
    </Container>
  );
}
