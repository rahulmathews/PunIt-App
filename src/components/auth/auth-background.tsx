// material-ui
import { Box, useTheme } from "@mui/material";

import Image from "next/image";

//Add SVG background

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{ position: "absolute", filter: "blur(18px)", zIndex: -1, bottom: 0 }}
    ></Box>
  );
};

export default AuthBackground;
