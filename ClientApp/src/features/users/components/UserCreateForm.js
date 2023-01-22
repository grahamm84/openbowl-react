import {
  Grid,
  ListItem,
  Box,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { Form, Formik } from "formik";
import { FormikTextField } from "global/helpers/components/formikTextField";
import * as api from "global/apiClient";
import AuthPagesButton from "features/auth/authPagesButton";
import { PropTypes } from "prop-types";
import ApiErrorBanner from "global/components/apiErrorBanner";
import PageHeader from "global/layouts/LoggedInLayout/Header/PageHeader";
import PermissionWrapperVisibility from "global/components/PermissionWrapper";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { AdminRole } from "global/helpers/UserRoleConstants";

function createPassword(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var numberList = "0123456789";
  var specialList = "!@#%^*()<>:_-+=";
  var charactersLength = characters.length;
  var numbersLength = numberList.length;
  var charLength = specialList.length;

  for (var i = 0; i < length; i++) {
    if (i == 1 || i == 3) {
      result += numberList.charAt(Math.floor(Math.random() * numbersLength));
    } else if (i == 2 || i == 7) {
      result += specialList.charAt(Math.floor(Math.random() * charLength));
    } else {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }
  return result;
}

function UserCreateForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  let history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    allowExtraEmails: false,
  };

  return (
    <>
      <PageHeader title="Create New User" />
      <ListItem sx={{ p: 3 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            setLoading(true);
            if (!showPassword) {
              var password = createPassword(15);
              values.password = password;
              values.confirmPassword = password;
            }
            if (values.name.length === 0) {
              values.name = values.email.substring(0, 2).toUpperCase();
            }

            const updateData = async () => {
              try {
                await api.apiPost(
                  "auth/register",
                  values,
                  true,
                  "Creating New User",
                  "User Created",
                  "Could not Create User"
                );
                history.push("/users");
              } catch (err) {
                setErrors(err.errors);
              }
              setLoading(false);
            };
            // call the async updateData function
            updateData();
          }}
        >
          {() => (
            <>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ApiErrorBanner errors={errors ?? undefined} />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormikTextField
                      size="medium"
                      fullWidth
                      formikKey="name"
                      label="Name"
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item sm={4} />
                  <Grid item xs={12} sm={8}>
                    <FormikTextField
                      size="medium"
                      fullWidth
                      formikKey="email"
                      label="Email Address"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item sm={4} />

                  <PermissionWrapperVisibility permissions={[AdminRole]}>
                    <Grid item xs={12} sm={8}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              defaultChecked
                              checked={showPassword}
                              onChange={() => setShowPassword(!showPassword)}
                            />
                          }
                          label="Set Password Manually"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item sm={4} />
                  </PermissionWrapperVisibility>
                  {showPassword ? (
                    <>
                      <Grid item xs={12} sm={8}>
                        <FormikTextField
                          size="medium"
                          fullWidth
                          formikKey="password"
                          label="Create Password"
                          autoComplete="password"
                        />
                      </Grid>
                      <Grid item sm={4} />
                      <Grid item xs={12} sm={8}>
                        <FormikTextField
                          size="medium"
                          fullWidth
                          formikKey="confirmPassword"
                          label="Confirm Password"
                          autoComplete="confirmPassword"
                        />
                      </Grid>
                      <Grid item sm={4} />
                    </>
                  ) : (
                    <></>
                  )}

                  <Grid item xs={3}>
                    <AuthPagesButton
                      label="Create User"
                      loading={loading}
                    ></AuthPagesButton>
                  </Grid>
                  <Grid item xs={3}>
                    <Box mt={4} mb={4}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        component={RouterLink}
                        to={"users"}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            </>
          )}
        </Formik>
      </ListItem>
    </>
  );
}

export default UserCreateForm;

UserCreateForm.propTypes = {
  editMode: PropTypes.func,
};
