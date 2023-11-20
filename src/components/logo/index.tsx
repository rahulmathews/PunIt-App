import PropTypes from "prop-types";

import { ButtonBase } from "@mui/material";
import Logo from "./logo";

const LogoSection = ({}) => {
  return (
    <ButtonBase
      disableRipple
      // component={Link}
      // onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      // to={!to ? config.defaultPath : to}
      sx={{ margin: "0px" }}
    >
      <Logo />
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
