import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const lightTheme = () =>
  responsiveFontSizes(
    createTheme({
      palette: {
        type: "light",
        background: {
          default: "#d3d3d3",
        },
      },
    })
  );

const darkTheme = () =>
  responsiveFontSizes(
    createTheme({
      palette: {
        type: "dark",
      },
    })
  );

export { lightTheme, darkTheme };
