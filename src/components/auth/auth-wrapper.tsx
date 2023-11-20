import PropTypes from "prop-types";

// material-ui
import { Box, Grid } from "@mui/material";

// project import
import AuthCard from "./auth-card";
import Logo from "@punit-app/components/logo";
import AuthFooter from "./auth-footer";

// assets
import AuthBackground from "./auth-background";

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: any) => (
  <Box sx={{ minHeight: "100vh" }}>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <Logo />
      </Grid>

      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: { xs: "calc(100vh - 178px)", md: "calc(100vh - 158px)" },
          }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;
