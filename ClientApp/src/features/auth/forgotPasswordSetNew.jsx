import React from "react";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { Box } from "@mui/material";
import { UserPasswordSetValidation } from "./validation/userPasswordSetValidation";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { useAuth } from "global/useAuth";
import { Alert, AlertTitle } from "@mui/material";
import AuthPagesWrapper from "./authPagesWrapper";
import AuthPagesForm from "./authPagesForm";
import AuthPagesButton from "./authPagesButton";
import AuthPagesShowErrors from "./authPagesShowErrors";

let initialValues = {
  userId: "",
  password: "",
  confirmPassword: "",
  passwordCode: "",
};
export default function ForgotPasswordSetNew() {
  let history = useHistory();
  const auth = useAuth();
  const [apiErrors, setApiErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const params = useParams();

  let userId = params.id;
  let passwordCode = params.passwordCode;

  let valid = false;
  if (userId !== undefined || passwordCode !== undefined) {
    valid = true;
    initialValues.userId = userId;
    initialValues.passwordCode = passwordCode;
  }

  return (
    <AuthPagesWrapper label="Set New Password" step={2}>
      {valid ? (
        <Formik
          initialValues={initialValues}
          initialErrors={apiErrors ?? undefined}
          validationSchema={UserPasswordSetValidation}
          onSubmit={(values) => {
            setLoading(true);
            setApiErrors(null);
            auth.confirmPasswordReset(values).then((data) => {
              setLoading(false);
              if (data.errors) {
                setApiErrors(data.errors);
              } else {
                history.push("password-set");
              }
            });
          }}
        >
          {() => (
            <AuthPagesForm>
              <AuthPagesShowErrors errors={apiErrors ?? undefined} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormikTextField
                    formikKey="password"
                    label="Password"
                    autoComplete="password"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    formikKey="confirmPassword"
                    label="Confirm Password"
                    autoComplete="new-password"
                    type="password"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <AuthPagesButton label="Set Password" loading={loading} />

              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to={"login"}>
                    Back to Login
                  </Link>
                </Grid>
              </Grid>
            </AuthPagesForm>
          )}
        </Formik>
      ) : (
        <React.Fragment>
          <Alert severity="error">
            <AlertTitle>Error with email link</AlertTitle>
            The link you have arrived at is invalid, please check your email
            again and if the button doesn`&apos;`t work, please try the manual
            link supplied in the email
          </Alert>
          <Box mt={10}>
            <Typography variant="caption">
              If you keep seeing this error, please contact support.
            </Typography>
          </Box>
        </React.Fragment>
      )}
    </AuthPagesWrapper>
  );
}
