import PropTypes from "prop-types";

import Logo from "./logo";
import React from "react";

const LogoSection = ({ className, props }: any) => {
  return <Logo className={className} {...props} />;
};

// LogoSection.propTypes = {
//   sx: PropTypes.object,
//   to: PropTypes.string,
// };

export default LogoSection;
