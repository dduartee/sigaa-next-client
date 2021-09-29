import { ThemeOptions } from "@material-ui/core/styles";
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
  typography: {
    h6: {
      fontWeight: 400,
      '@media (max-width:425px)': {
        fontSize: '1rem',
      },
      '@media (max-width:768px)': {
        fontSize: '1.1rem',
      },
    },

  },
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
