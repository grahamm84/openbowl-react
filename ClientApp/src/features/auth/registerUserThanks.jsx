import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Alert } from "@mui/material";
import AuthPagesWrapper from "./authPagesWrapper";

export default function RegisterUserThanks() {
  return (
    <AuthPagesWrapper label="Thanks for registering!">
      <Box mt={3} mb={3}>
        <Alert severity="success">User Registered</Alert>
        <Box mt={3}>
          <Typography variant="body1">
            You now need to verify your account before you can login. You can do
            this by clicking the link in your email we just sent you.
          </Typography>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={RouterLink}
            to={"login"}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </AuthPagesWrapper>
  );
}
