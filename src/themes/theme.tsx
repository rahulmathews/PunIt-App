import { MantineColorsTuple, createTheme } from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#faedff",
  "#edd9f7",
  "#d8b1ea",
  "#c286dd",
  "#ae62d2",
  "#a24bcb",
  "#9e3fc9",
  "#8931b2",
  "#7b2aa0",
  "#6b218d",
];

export const theme = createTheme({
  colors: {
    myColor,
  },
});
