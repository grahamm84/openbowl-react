import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { UserActivationValidation } from "./validation/userActivationValidation";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { useAuth } from "global/useAuth";
import AuthPagesWrapper from "./authPagesWrapper";
import AuthPagesButton from "./authPagesButton";
import AuthPagesForm from "./authPagesForm";
import ApiErrorBanner from "global/components/apiErrorBanner";

const initialValues = {
  userId: "",
  activationCode: "",
};

export default function ActivateUser() {
  let history = useHistory();
  const auth = useAuth();
  const [apiErrors, setApiErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const queryParameters = new URLSearchParams(window.location.search);
  var confirmCode = queryParameters.get("confirmCode");
  var userid = queryParameters.get("id");

  initialValues.activationCode = confirmCode;
  initialValues.userId = userid;

  return (
    <AuthPagesWrapper label="Activate User" step={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={UserActivationValidation}
        onSubmit={(values) => {
          setLoading(true);
          setApiErrors(null);
          setTimeout(() => {
            auth.activateUser(values).then((data) => {
              setLoading(false);
              if (data.errors) {
                setApiErrors(data.errors);
              } else {
                // activated
                history.push("user-activated");
              }
            });
          }, 400);
        }}
      >
        {() => (
          <AuthPagesForm>
            <ApiErrorBanner errors={apiErrors} title="User Activation Error" />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Enter your activation code
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  formikKey="activationCode"
                  label="Activation Code"
                  autoComplete="activationCode"
                  fullWidth
                />
              </Grid>
            </Grid>

            <AuthPagesButton label="Activate User" loading={loading} />

            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to={"login"}>
                  Login
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={"register"}>
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
