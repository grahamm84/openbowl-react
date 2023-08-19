import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { UserPasswordResetValidation } from "./validation/userPasswordResetValidation";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { useAuth } from "global/useAuth";
import AuthPagesWrapper from "./authPagesWrapper";
import AuthPagesButton from "./authPagesButton";
import AuthPagesForm from "./authPagesForm";

const initialValues = {
  emailAddress: "",
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);

  return (
    <AuthPagesWrapper label="Forgot Password" step={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={UserPasswordResetValidation}
        onSubmit={(values) => {
          setLoading(true);
          auth.sendPasswordResetEmail(values).then(() => {
            setLoading(false);
            navigate("/forgot-password-email-sent");
          });
        }}
      >
        {() => (
          <AuthPagesForm>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Enter your email address associated with your account and you
                  will be emailed a link to reset your password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  formikKey="emailAddress"
                  label="Email Address"
                  autoComplete="emailAddress"
                  fullWidth
                />
              </Grid>
            </Grid>

            <AuthPagesButton label="Request Reset" loading={loading} />

            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to={"/login"}>
                  Login
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={"/register"}>
                  Register
                </Link>
              </Grid>
            </Grid>
          </AuthPagesForm>
        )}
      </Formik>
    </AuthPagesWrapper>
  );
}
