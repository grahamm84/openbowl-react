import { Grid, ListItem, Box, Button, Alert } from "@mui/material";
import { useState } from "react";
import { Form, Formik } from "formik";
import { FormikTextField } from "global/helpers/components/formikTextField";
import * as api from "global/apiClient";
import AuthPagesButton from "features/auth/authPagesButton";
import { PropTypes } from "prop-types";

function PasswordChangeEditForm(props) {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
    oldPassword: "",
  };

  return (
    <ListItem sx={{ p: 3 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setLoading(true);
          const updateData = async () => {
            try {
              await api.apiPost(
                "account/change-password",
                values,
                true,
                "Updating Password 🔑",
                "Password Updated",
                "Could not update Password"
              );
              props.editMode(false);
            } catch (err) {
              // error handling here
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
                  formikKey="password"
                  label="New Password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={6} sm={6} />
              <Grid item xs={6} sm={6}>
                <FormikTextField
                  size="medium"
                  fullWidth
                  formikKey="confirmPassword"
                  label="Confirm Password"
                  autoComplete="confirmPassword"
                />
              </Grid>
              <Grid item xs={6} sm={6} />
              <Grid item xs={6} sm={6}>
                <Alert severity="info">
                  Please enter your existing password to confirm change
                </Alert>
              </Grid>
              <Grid item xs={6} sm={6} />
              <Grid item xs={6} sm={6}>
                <FormikTextField
                  size="medium"
                  fullWidth
                  formikKey="oldPassword"
                  label="Existing Password"
                  autoComplete="oldPassword"
                />
              </Grid>
              <Grid item xs={6} sm={6} />
              <Grid item xs={3} sm={3}>
                <AuthPagesButton
                  label="Update Password"
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
    </ListItem>
  );
}

export default PasswordChangeEditForm;

PasswordChangeEditForm.propTypes = {
  editMode: PropTypes.func,
};
