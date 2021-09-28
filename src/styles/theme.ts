import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#268E36",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1B7D2B",
    },
    background: {
      paper: "#1c1c1c",
      default: "#151515",
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingTop: "1em",
          paddingBottom: "1em",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "div[dir=rtl] &": {
            transform: "scaleX(-1)",
          },
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          
        },
      },
    },
  },
};
// Create a theme instance.
const theme = createTheme(themeOptions);

export default theme;
