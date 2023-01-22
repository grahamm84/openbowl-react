import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Alert } from "@mui/material";
import AuthPagesWrapper from "./authPagesWrapper";

export default function UserActivated() {
  return (
    <AuthPagesWrapper label="User Activation">
      <Box mt={3} mb={3}>
        <Alert severity="success">Activation Success</Alert>
        <Box mt={3}>
          <Typography variant="body1">
            Thank you for activating your account - you can now login.
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
