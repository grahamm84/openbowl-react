import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import PropTypes from "prop-types";

export default function AuthPagesWrapper(props) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box>
        <Typography component="h1" variant="h2" mb={2}>
          {props.label}
        </Typography>
        <Divider />
        <Box mt={2}>{props.children}</Box>
      </Box>
    </Container>
  );
}

AuthPagesWrapper.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};
