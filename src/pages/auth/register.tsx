// material-ui
import { Grid, Stack, Typography } from "@mui/material";

import AuthRegister from "@punit-app/components/auth/register-form";
import AuthWrapper from "@punit-app/components/auth/auth-wrapper";
import Link from "next/link";

// ================================|| REGISTER ||================================ //

const Register = () => (
  <AuthWrapper>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography variant="h5">Sign up</Typography>
          <Link href="/auth" color="primary">
            Already have an account?
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthRegister />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Register;
