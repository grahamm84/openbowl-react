import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import * as api from "global/apiClient";
import AuthPagesButton from "features/auth/authPagesButton";
import BackspaceTwoToneIcon from "@mui/icons-material/BackspaceTwoTone";
import UserRolesDropdown from "./userRolesDropdown";

function UserRolesEdit(props) {
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState(props.roles);

  const handleChange = (event, value) => {
    setUserRoles(value);
  };

  const updateUserRoles = async () => {
    setLoading(true);
    try {
      const result = await api.apiPost(
        "users/update-user-roles",
        { userId: props.userId, userRoles: userRoles },
        true,
        "Updating User Roles 👤",
        "Request Completed",
        "Error with updating user roles"
      );
      props.setUserDetails(result.data);
      props.editMode(false);
    } catch (err) {
      // error handling code
    }
    setLoading(false);
  };

  return (
    <Card>
      <Box
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Edit User Roles
          </Typography>
          <Typography variant="subtitle2">
            Manage the roles for this user
          </Typography>
        </Box>
        <Button
          variant="text"
          startIcon={<BackspaceTwoToneIcon />}
          onClick={() => props.editMode(false)}
        >
          Cancel
        </Button>
      </Box>
      <Divider />
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UserRolesDropdown value={userRoles} onChange={handleChange} />
          </Grid>

          <Grid item xs={6} lg={3}>
            <AuthPagesButton
              label="Update Roles"
              loading={loading}
              onClick={() => updateUserRoles()}
            ></AuthPagesButton>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Box mt={4} mb={4}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => props.editMode(false)}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserRolesEdit;

UserRolesEdit.propTypes = {
  userId: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  editMode: PropTypes.func.isRequired,
  setUserDetails: PropTypes.func.isRequired,
};
