import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";
// import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import {
  PRIMARY_LIGHT,
  PRIAMRY_DARK,
  NORMAL_DARK,
  NORMAL_LIGHT,
} from "../constants/Color";

const breakpoints = {
  sm: "23.5em",
  md: "60em",
  lg: "90em",
  xl: "120em",
};

const theme = extendTheme({
  colors: {
    primary: {
      0: "#f85756",
      100: "#25C175",
      200: "#21AB68",
      400: "#19804E",
      600: "#105634",
      800: "#081B1A",
    },
    secondary: "#FFC547",
    error: "#D6432F",
    success: "#36C78A",
    waring: "#FF7456",
    neutral: {
      header: "#171D33",
      body: "#30384B",
      subhead: "#8A97AB",
      subbody: "#B2BAC8",
      lineDisable: "#D7DDE5",
      bg: "#ECF1F4",
      border: "#ECEDEF",
    },
  },
  components: {
    Button: {
      variants: {
        "gradient-button": {
          bg: "linear-gradient(80.3deg, #FF8A00 28.85%, #FF5A00 61.45%, #E74645 94.98%)",
          color: "white",
        },
        "gradient-outline": {
          bg: "none",
          color: "#B2BAC8",
        },
      },
    },
  },
  fonts: {
    heading: "Rubik",
    body: "Rubik",
  },
  breakpoints,

  styles: {
    global: (props: any) => ({
      body: {
        overflowX: "hidden",
        bg: mode("#ffffff", "#262e40")(props),
        color: mode("gray.800", "whiteAlpha.900")(props),
        lineHeight: "base",
        backgroundPosition: "0 -30vh",
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
      },
      /**
       * Text Color Section
       */
      ".super-title": {
        fontSize: "96px",
        lineHeight: "114px",
        fontWeight: 600,
      },
      ".h1-bold": {
        fontSize: "48px",
        lineHeight: "57px",
        fontWeight: 600,
      },
      ".h2-bold": {
        fontSize: "32px",
        lineHeight: "38px",
        fontWeight: 700,
      },
      ".h3-bold": {
        fontSize: "24px",
        lineHeight: "28px",
        fontWeight: 700,
      },
      ".h5-bold": {
        fontSize: "16px",
        lineHeight: "19px",
        fontWeight: 700,
      },
      ".h6-semibold": {
        fontSize: "14px",
        lineHeight: "17px",
        fontWeight: 600,
      },
      ".body1": {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px",
      },
      ".body2": {
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "17px",
      },
      ".subtitle": {
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "14px",
      },
      ".caption": {
        fontWeight: 400,
        fontSize: "11px",
        lineHeight: "13px",
      },
      ".overline": {
        fontWeight: 700,
        fontSize: "12px",
        lineHeight: "14px",
      },
      ".link": {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px",
        textDecorationLine: "underline",
      },
      ".header-menu": {
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "24px",
      },
      ".button": {
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "24px",
      },
      ".small-button": {
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "24px",
      },
      ".btn-menu": {
        width: "100%",
      },
    }),
  },
});

export default theme;
