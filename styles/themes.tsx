import { createTheme, ThemeOptions } from "@material-ui/core/styles";
const light: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#32A041",
    },
    secondary: {
      main: "#f50029",
    },
    background: {
      default: "#e8e8e8",
    },
  },
};
const dark: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#207e3f",
    },
    secondary: {
      main: "#c20020",
    },
    background: {
      default: "#212121",
      paper: "#0f0f0f",
    },
  },
};

export { dark, light };
