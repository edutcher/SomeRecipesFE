import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Grid,
  TextField,
} from "@material-ui/core";

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

export default function DescriptionArea(props) {
  const classes = useStyles();
  const {
    title,
    setTitle,
    category,
    setCategory,
    description,
    setDescription,
    totalTime,
    setTotalTime,
  } = props;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTotalTime(e.target.value);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={5}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          required
          value={title}
          onChange={handleTitleChange}
        />
      </Grid>
      <Grid xs={0} sm={3}></Grid>
      <Grid item xs={12} sm={3}>
        <FormControl required className={classes.formControl}>
          <InputLabel id="demo-simple-select-required-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={category}
            onChange={handleCategoryChange}
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Main"}>Main</MenuItem>
            <MenuItem value={"Side"}>Side</MenuItem>
            <MenuItem value={"Appetizer"}>Appetizer</MenuItem>
            <MenuItem value={"Dessert"}>Dessert</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        style={{ marginTop: "15px", marginBottom: "50px" }}
      >
        <TextField
          fullWidth
          required
          id="description"
          name="description"
          value={description}
          label="Description"
          onChange={handleDescriptionChange}
        />
      </Grid>
      <Grid xs={0} sm={3}></Grid>
      <Grid
        item
        xs={12}
        sm={3}
        style={{ marginTop: "15px", marginBottom: "50px" }}
      >
        <TextField
          id="totalTime"
          name="totalTime"
          label="Total Time(minutes)"
          required
          value={totalTime}
          onChange={handleTimeChange}
        />
      </Grid>
    </Grid>
  );
}
