import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  progRoot: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  tagRoot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  addBtn: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function IngredientsArea(props) {
  const classes = useStyles();
  const { ingredients, setIngredients } = props;
  const [newIngredient, setNewIngredient] = useState(null);

  const handleAddIngredient = () => {
    if (ingredients) setIngredients([...ingredients, newIngredient]);
    else setIngredients([newIngredient]);
    setNewIngredient("");
  };

  const handleIngredientChange = (e) => {
    setNewIngredient(e.target.value);
  };

  const handleDeleteItem = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    const newerIngredients = ingredients.filter((item) => item !== id);

    if (newerIngredients.length === 0) setIngredients(null);
    else setIngredients(newerIngredients);
  };

  return (
    <Grid container justify="center">
      {ingredients && (
        <Grid item container xs={12}>
          <List>
            {ingredients.map((item) => {
              return (
                <ListItem key={item}>
                  <ListItemText primary={item} />
                  <ListItemIcon
                    data-id={item}
                    onClick={handleDeleteItem}
                    style={{ marginLeft: "100px" }}
                  >
                    <HighlightOffIcon />
                  </ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sm={12}
        style={{ marginTop: "25px", marginBottom: "50px" }}
      >
        <TextField
          id="newIngredient"
          name="newIngredient"
          label="Add Ingredient"
          required
          value={newIngredient}
          onChange={handleIngredientChange}
        />
        <IconButton onClick={handleAddIngredient}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
