import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import AuthPagesWrapper from "./authPagesWrapper";

export default function ForgotPasswordThanks() {
  return (
    <AuthPagesWrapper label="Password Reset" step={1}>
      <Box mt={3} mb={3}>
        <Typography variant="body1">
          If your email address was valid you should get an email shortly with a
          link to reset your password. Click the link to set your new password,
          your link won`&apos;`t last long so if it has expired, please try this
          again.
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs>
          <Link component={RouterLink} to={"login"}>
            Login
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to={"register"}>
            Register
          </Link>
        </Grid>
      </Grid>
    </AuthPagesWrapper>
  );
}
