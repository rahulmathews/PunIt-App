import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";

import Image from "next/image";

// project import
import DrawerHeaderStyled from "./drawer-header-styled";
import Logo from "@punit-app/components/logo";

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }: any) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo className="mt-4" />
        <Image
          src={"/assets/isolated-monochrome-mod.svg"}
          alt="image-logo"
          height={60}
          width={60}
          className="-ml-2 -mt-4"
        />
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
