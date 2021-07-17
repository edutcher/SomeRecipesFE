import React from "react";
import { Container, Typography, Box, makeStyles } from "@material-ui/core";
import UploadStepper from "../components/UploadStepper/UploadStepper";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(3),
  },
}));

export default function NewPhotoPage() {
  const classes = useStyles();

  return (
    <Container>
      <Box className={classes.heading}>
        <Typography variant="h4" component="h4">
          Add Recipe
        </Typography>
      </Box>
      <UploadStepper />
    </Container>
  );
}
