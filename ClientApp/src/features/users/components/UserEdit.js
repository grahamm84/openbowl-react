import { Divider } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import * as api from "global/apiClient";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import PasswordTwoToneIcon from "@mui/icons-material/PasswordTwoTone";
import PersonOffTwoToneIcon from "@mui/icons-material/PersonOffTwoTone";
import { PersonOutlineTwoTone, SmartButtonTwoTone } from "@mui/icons-material";

function UserEdit(props) {
  const [loading, setLoading] = useState(false);

  const [user] = useState(props.user);

  const sendPasswordReset = async () => {
    setLoading(true);
    try {
      await api.apiPost(
        "users/request-password-reset",
        user.userId,
        true,
        "Sending Password Reset 👤",
        "Request Completed",
        "Error with sending a password reset"
      );
      props.editMode(false);
    } catch (err) {
      // error handling code
    }
    setLoading(false);
  };

  const sendLockRequest = async () => {
    setLoading(true);
    try {
      const result = await api.apiPost(
        "users/toggle-account-lock",
        user.userId,
        true,
        "Toggling User Lock Status 👤",
        "Request Completed",
        "Error changing lock status"
      );
      props.setUserDetails(result.data);
      props.editMode(false, true);
    } catch (err) {
      // error handling code
    }
    setLoading(false);
  };

  const sendNewActivationRequest = async () => {
    setLoading(true);
    try {
      await api.apiPost(
        "users/resend-activation",
        user.userId,
        true,
        "Sending New Activation Code 👤",
        "Request Completed",
        "Error with sending a new activation code"
      );
      props.editMode(false, true);
    } catch (err) {
      // error handling code
    }
    setLoading(false);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <LoadingButton
        variant="contained"
        color="primary"
        loadingPosition="start"
        loading={loading ?? undefined}
        startIcon={<PasswordTwoToneIcon />}
        onClick={() => sendPasswordReset()}
      >
        Send Password Reset
      </LoadingButton>
      <LoadingButton
        variant="contained"
        color="primary"
        loadingPosition="start"
        loading={loading ?? undefined}
        startIcon={
          user.lockoutEnds === null ? (
            <PersonOffTwoToneIcon />
          ) : (
            <PersonOutlineTwoTone />
          )
        }
        onClick={() => sendLockRequest()}
      >
        {user.lockoutEnds === null ? "Disable User" : "Enable User"}
      </LoadingButton>

      {user.emailConfirmed === false && (
        <LoadingButton
          variant="contained"
          color="primary"
          loadingPosition="start"
          loading={loading ?? undefined}
          startIcon={<SmartButtonTwoTone />}
          onClick={() => sendNewActivationRequest()}
        >
          Resend Activation Email
        </LoadingButton>
      )}
    </Stack>
  );
}

export default UserEdit;

UserEdit.propTypes = {
  user: PropTypes.object,
  editMode: PropTypes.func,
  setUserDetails: PropTypes.func,
};
