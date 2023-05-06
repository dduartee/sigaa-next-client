import { ThemeOptions } from "@mui/material";
const dark: ThemeOptions = {
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#207e3f',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#17592db3',
            },
          },
        },
      },
    }
  },
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
      "900": "#105f2c",
      "800": "#207e3f",
      "700": "#288f4a",
      "600": "#32a156",
      "500": "#3ab060",
      "400": "#5abc77",
      "300": "#78c88f",
      "200": "#9fd7ae",
      "100": "#c5e7ce",
    },
    secondary: {
      main: "#c20020",
    },
    background: {
      default: "#212121",
      paper: "#0f0f0f",
    },
  }
};

const forbidden: ThemeOptions = {
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#7e2020',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#591717b3',
            },
          },
        },
      },
    }
  },
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
      main: "#ab1212",
      "900": "#8a0f0f",
      "800": "#a11b1b",
      "700": "#cd2323",
      "600": "#d8312a",
      "500": "#e73b2b",
      "400": "#e44c46",
      "300": "#dc6d6b",
      "200": "#e99594",
      "100": "#fccace",
    },
    secondary: {
      main: "#207e3f",
    },
    background: {
      default: "#212121",
      paper: "#0f0f0f",
    },
  }
};

export { dark, forbidden };
