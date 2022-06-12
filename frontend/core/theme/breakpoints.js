import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "320px", // smallest screen
  sm2: "410px", // tabs
  md: "768px",   // small desktop
  lg: "1024px",  // large desktop[s]
  lg2: "1200px", // larger desktops
  xl: "1440px",  // wide tv screens
  xxl: "1600px", // wider screens
});

export default breakpoints;
