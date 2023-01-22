import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

export default function AuthPagesButton(props) {
  return (
    <Box mt={4} mb={4}>
      <LoadingButton
        type="submit"
        loading={props.loading}
        fullWidth
        variant="contained"
        color="primary"
        onClick={props.onClick}
      >
        {props.label}
      </LoadingButton>
    </Box>
  );
}

AuthPagesButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};
