import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import axios from "axios";
import useQuery from "../hooks/useQuery.js";

export default function SearchPage() {
  let query = useQuery();
  const q = query.get("q");
  const [searchResults, setSearchResults] = useState(null);
  const [searchErr, setSearchErr] = useState(false);

  useEffect(() => {
    const doSearch = async () => {
      try {
        const result = await axios.post(
          `https://ghywcwdod3.execute-api.us-east-2.amazonaws.com/dev/recipes/search/${q}`
        );
        console.log(result);
        if (result.status === 200) {
          setSearchResults(result.data);
          setSearchErr(false);
        }
      } catch (error) {
        setSearchResults(null);
        setSearchErr(true);
      }
    };
    doSearch();
  }, [q]);

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
