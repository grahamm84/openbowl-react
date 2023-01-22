import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { useAuth } from "global/useAuth";
import AuthPagesWrapper from "./authPagesWrapper";
import AuthPagesForm from "./authPagesForm";
import AuthPagesButton from "./authPagesButton";
import AuthPagesShowErrors from "./authPagesShowErrors";

const initialValues = {
  username: "graham.masters@gmail.com",
  password: "IERoyMooz1!",
  rememberMe: false,
};
export default function Login() {
  const auth = useAuth();
  const [apiErrors, setApiErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <AuthPagesWrapper label="Login">
      <Formik
        initialValues={initialValues}
        initialErrors={apiErrors ?? undefined}
        onSubmit={(values) => {
          setLoading(true);
          setApiErrors(null);
          auth.login(values).then((data) => {
            if (data.errors) {
              setLoading(false);
              setApiErrors(data.errors);
            }
          });
        }}
      >
        {({ values }) => (
          <AuthPagesForm>
            <AuthPagesShowErrors
              errors={apiErrors ?? undefined}
              email={values.username}
            />
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
              mt={2}
            >
              <Grid item xs={12}>
                <FormikTextField
                  formikKey="username"
                  label="Email Address"
                  autoComplete="username"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  formikKey="password"
                  label="Password"
                  autoComplete="password"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <AuthPagesButton fullWidth label="Sign In" loading={loading} />
            </Grid>

            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to={"forgot-password"}>
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={"register"}>
                  Don&apos;t have an account? Register here.
                </Link>
              </Grid>
            </Grid>
          </AuthPagesForm>
        )}
      </Formik>
    </AuthPagesWrapper>
  );
}
