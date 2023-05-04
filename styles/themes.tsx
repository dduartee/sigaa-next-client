import { ThemeOptions } from "@material-ui/core/styles";
const dark: ThemeOptions = {
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#207e3f',
          }
        }
      }
    },
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
      "300": "#1f7e20",
      "200": "#74b88b",
      "100": "#25964a",
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

const forbidden: ThemeOptions = {
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#7e2020',
          }
        }
      }
    },
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
      "300": "#b21f1f",
      "200": "#973030",
      "100": "#962525",
    },
    secondary: {
      main: "#207e3f",
    },
    background: {
      default: "#212121",
      paper: "#0f0f0f",
    },
  },
};
export { dark, forbidden };
