// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from "@mui/material";

// project import
import AuthLogin from "@punit-app/components/auth/login-form";
import AuthWrapper from "@punit-app/components/auth/auth-wrapper";
import Link from "next/link";

// ================================|| LOGIN ||================================ //

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography variant="h5">Login</Typography>
          <Link href="/auth/register">Don&apos;t have an account?</Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;
