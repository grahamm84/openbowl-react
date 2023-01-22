import React, { useState, useEffect } from "react";
import * as api from "global/apiClient";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import PageHeader from "global/layouts/LoggedInLayout/Header/PageHeader";
import { useParams } from "react-router-dom";
import PropertyAndValueDisplay from "global/components/cardDisplay/propertyAndValueDisplay";
import {
  ErrorTwoTone,
  DoneTwoTone,
  EditTwoTone,
  BackspaceTwoTone,
} from "@mui/icons-material";

import SimpleTextList from "global/components/simpleTextList";
import PermissionWrapperVisibility from "global/components/PermissionWrapper";
import { UserRoles_Edit, Users_Edit } from "global/helpers/UserRoleConstants";
import UserRolesEdit from "./components/UserRolesEdit";
import UserEdit from "./components/UserEdit";

const UserContainer = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editUserMode, setEditUserMode] = useState(false);
  const [editRolesMode, setEditRolesMode] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.apiGet(`users/${params.userId}`);

        setUserDetails(result.data);
      } catch (err) {
        // error handling code
      }
    };
    // call the async fetchData function
    fetchData();
  }, []);

  return (
    <>
      <PageHeader title={`User ${userDetails?.email}`} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Account Details
                </Typography>
                <Typography variant="subtitle2">
                  Details related to the login account for this user
                </Typography>
              </Box>
              <PermissionWrapperVisibility permissions={[Users_Edit]}>
                <Button
                  variant="text"
                  startIcon={
                    editUserMode ? <BackspaceTwoTone /> : <EditTwoTone />
                  }
                  onClick={() => setEditUserMode(!editUserMode)}
                >
                  {editUserMode ? "Cancel" : "Edit"}
                </Button>
              </PermissionWrapperVisibility>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <PropertyAndValueDisplay
                    propertyLabel="Email"
                    propertyValue={userDetails?.email}
                  />
                  <PropertyAndValueDisplay
                    propertyLabel="Email Confirmed"
                    propertyComponent={
                      userDetails?.emailConfirmed ? (
                        <Chip
                          color="success"
                          size="small"
                          icon={<DoneTwoTone />}
                          label="Confirmed"
                        />
                      ) : (
                        <Chip
                          color="error"
                          icon={<ErrorTwoTone />}
                          size="small"
                          label="Not Confirmed"
                        />
                      )
                    }
                  />

                  <PropertyAndValueDisplay
                    propertyLabel="Account Status"
                    propertyValue={
                      userDetails?.lockoutEnds
                        ? `Locked out until ${userDetails?.lockoutEnds}`
                        : "Active"
                    }
                  />
                  <PropertyAndValueDisplay
                    propertyLabel="Failed Logins"
                    propertyValue={userDetails?.failedLoginAttempts.toString()}
                  />
                </Grid>
              </Typography>
            </CardContent>
            {editUserMode ? (
              <Box mb={2}>
                <UserEdit
                  user={userDetails}
                  editMode={setEditUserMode}
                  setUserDetails={setUserDetails}
                />
              </Box>
            ) : (
              <></>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  User Profile
                </Typography>
                <Typography variant="subtitle2">
                  Optional profile information for this user
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <PropertyAndValueDisplay
                    propertyLabel="Name"
                    propertyValue={userDetails?.userProfile?.name ?? "not set"}
                  />
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          {editRolesMode ? (
            <UserRolesEdit
              editMode={setEditRolesMode}
              userId={params.userId}
              setUserDetails={setUserDetails}
              roles={userDetails?.availableRoles}
            />
          ) : (
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    User Roles
                  </Typography>
                  <Typography variant="subtitle2">
                    Assigned User Roles for this User
                  </Typography>
                </Box>
                <PermissionWrapperVisibility permissions={[UserRoles_Edit]}>
                  <Button
                    variant="text"
                    startIcon={<EditTwoTone />}
                    onClick={() => setEditRolesMode(true)}
                  >
                    Edit
                  </Button>
                </PermissionWrapperVisibility>
              </Box>
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <SimpleTextList
                  title="User Roles"
                  items={userDetails?.availableRoles}
                />
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserContainer;
