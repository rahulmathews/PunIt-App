// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";

import Image from "next/image";

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const googleHandler = async () => {
    // login || singup
  };

  const twitterHandler = async () => {
    // login || singup
  };

  const facebookHandler = async () => {
    // login || singup
  };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? "space-around" : "space-between"}
      sx={{
        "& .MuiButton-startIcon": {
          mr: matchDownSM ? 0 : 1,
          ml: matchDownSM ? 0 : -0.5,
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={
          <Image src="icons/google.svg" alt="Google" height={10} width={10} />
        }
        onClick={googleHandler}
      >
        {!matchDownSM && "Google"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={
          <Image src="icons/google.svg" alt="Twitter" height={10} width={10} />
        }
        onClick={twitterHandler}
      >
        {!matchDownSM && "Twitter"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={
          <Image src="icons/google.svg" alt="Facebook" height={10} width={10} />
        }
        onClick={facebookHandler}
      >
        {!matchDownSM && "Facebook"}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
