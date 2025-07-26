export const getPalette = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#D7C7F4",
            light: "#ffffff",
            dark: "#AF9FCD",
            bglight: "#fafafa",
            bgtheme: "#FAF7FF",
            bg: "#AF9FCD",
          },
          text: {
            primary: "#000000",
            secondary: "rgba(0,0,0,0.5)",
          },
        }
      : {
          primary: {
            main: "#34303d",
            light: "#3d3b41",
            dark: "#2a2730",
            bglight: "#212025",
            bgtheme: "#212025",
            bg: "#2a2730",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255,255,255,0.7)",
          },
        }),
  },

  typography: {
    body1: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 16,
      fontWeight: 400,
      // lineHeight: 21.79,
      textAlign: "left",
    },
    h1: {
      fontFamily: "Ubuntu, sans-serif",
      color: mode === "light" ? "#9785BA" : "#D7C7F4",
      fontWeight: 700,
      fontSize: 32,
      // lineHeight:36.77,
      "@media (max-width:768px)": {
        fontSize: 28,
      },
    },
    h2: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 28,
      fontWeight: 400,
      "@media (max-width:768px)": {
        fontSize: 22,
      },
    },
    h3: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 24,
      fontWeight: 400,
      "@media (max-width:768px)": {
        fontSize: 22,
      },
    },
    heading: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 20,
      fontWeight: 700,
      "@media (max-width:768px)": {
        fontSize: 22,
      },
    },
    subheading: {
      fontFamily: "Ubuntu, sans-serif",
      color: "text.primary",
      fontSize: 16,
      fontWeight: 400,
      "@media (max-width:768px)": {
        fontSize: 14,
      },
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: "large",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Open Sans, sans-serif",
        },
        contained: {
          fontFamily: "Ubuntu, sans-serif",
          border: 1,
        },
        outlined: {
          fontFamily: "Ubuntu, sans-serif",
          color: mode === "light" ? "#000000" : "#ffffff",
          borderColor: mode === "light" ? "#9785BA" : "#3d3b41",
          "&:hover": {
            background: mode === "light" ? "#AF9FCD" : "#2a2730",
          },
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 512,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
});
