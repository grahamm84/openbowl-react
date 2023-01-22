import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Alert } from '@mui/material';
import AuthPagesWrapper from "./authPagesWrapper";

export default function ForgotPasswordSetThanks() {
  return (
    <AuthPagesWrapper label="Password Reset" step={3}>
      <Box mt={3} mb={3}>
        <Alert severity="success">Password Set Successfully</Alert>
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Thanks for resetting your password
          </Typography>
          <Typography variant="body1">
            Everything is done, you can now login with your new details!
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
