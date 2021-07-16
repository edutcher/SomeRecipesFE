import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const lightTheme = () =>
  responsiveFontSizes(
    createMuiTheme({
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
    createMuiTheme({
      palette: {
        type: "dark",
      },
    })
  );

export { lightTheme, darkTheme };
