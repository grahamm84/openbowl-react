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
import { useState, useContext } from "react";
import { Form, Formik } from "formik";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { UserProfileContext } from "global/layouts/LoggedInLayout/LoggedInLayout";
import * as api from "global/apiClient";
import AuthPagesButton from "features/auth/authPagesButton";
import BackspaceTwoToneIcon from "@mui/icons-material/BackspaceTwoTone";
import { FormikCheckboxField } from "global/helpers/components/formikCheckboxField";

function ProfileInformationEdit(props) {
  const [loading, setLoading] = useState(false);
  const [user, setUserProfileData] = useContext(UserProfileContext);

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
            Edit Personal Details
          </Typography>
          <Typography variant="subtitle2">
            Manage informations related to your personal details
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
        <Formik
          initialValues={user}
          //validationSchema={UserRegistrationValidation}
          onSubmit={(values) => {
            setLoading(true);
            const updateData = async () => {
              try {
                const result = await api.apiPost(
                  "userprofile",
                  values,
                  true,
                  "Updating Profile 👤",
                  "Profile Updated",
                  "Could not update Profile"
                );
                setUserProfileData(result.data);
                props.editMode(false);
              } catch (err) {
                // error handling code
              }
              setLoading(false);
            };
            // call the async updateData function
            updateData();
          }}
        >
          {() => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <FormikTextField
                    size="medium"
                    fullWidth
                    formikKey="name"
                    label="Name"
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={6} sm={6} />
                <Grid item xs={6} sm={6}>
                  <FormikCheckboxField
                    formikKey="allowExtraEmails"
                    value={user.allowExtraEmails}
                    label="Allow Extra Email"
                  />
                </Grid>
                <Grid item xs={6} sm={6} />
                <Grid item xs={3} sm={3}>
                  <AuthPagesButton
                    label="Update Profile"
                    loading={loading}
                  ></AuthPagesButton>
                </Grid>
                <Grid item xs={3} sm={3}>
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
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default ProfileInformationEdit;

ProfileInformationEdit.propTypes = {
  editMode: PropTypes.func,
};
