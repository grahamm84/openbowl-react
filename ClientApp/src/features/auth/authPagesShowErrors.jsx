import { useState, React } from "react";
import { Alert, Grid } from "@mui/material";
import { Box } from "@mui/material";
import { SendTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import * as api from "global/apiClient";
import PropTypes from "prop-types";

export default function AuthPagesShowErrors(props) {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const sendNewActivationRequest = async () => {
    setLoading(true);
    try {
      await api.apiPost(
        "auth/request-new-activation",
        props.email,
        true,
        "Requesting New Activation Code",
        "Request Completed",
        "Error with sending a new activation code"
      );
    } catch (err) {
      // error handling code
    }
    setEmailSent(true);
    setLoading(false);
  };

  if (props.errors) {
    return (
      <Box mb={3}>
        <Alert severity="error">{props.errors.general[0]}</Alert>
        {props.errors.general[0]?.endsWith(
          "forgotten to activate your account"
        ) &&
          emailSent === false && (
            <Grid
              mt={1}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <LoadingButton
                variant="text"
                size="small"
                endIcon={<SendTwoTone />}
                loading={loading}
                onClick={sendNewActivationRequest}
              >
                Resend activation link
              </LoadingButton>
            </Grid>
          )}
      </Box>
    );
  }
  return null;
}

AuthPagesShowErrors.propTypes = {
  errors: PropTypes.array,
  email: PropTypes.string,
};
