// material-ui
import { Box, IconButton, Link, useMediaQuery } from "@mui/material";
import { GithubOutlined } from "@ant-design/icons";

// project import
import Search from "./search";
import Profile from "./profile";
import Notification from "./notification";
import MobileSection from "./mobile-section";
import { Fragment } from "react";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <>
      {/* {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />} */}
      <Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }} />
      <IconButton
        component={Link}
        href="https://google.com"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: "text.primary", bgcolor: "grey.100" }}
      >
        <GithubOutlined />
      </IconButton>

      {/* <Notification /> */}
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
