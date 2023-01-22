import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import { FormikTextField } from "global/helpers/components/formikTextField";
import { FormikCheckboxField } from "global/helpers/components/formikCheckboxField";
import { useAuth } from "global/useAuth";
import { UserRegistrationValidation } from "./validation/userRegistrationValidation";
import AuthPagesWrapper from "./authPagesWrapper";
import AuthPagesForm from "./authPagesForm";
import AuthPagesButton from "./authPagesButton";
import AuthPagesShowErrors from "./authPagesShowErrors";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import TermsAndConditions from "./termsAndConditions";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAgreed: false,
  allowExtraEmails: false,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RegisterUser() {
  const auth = useAuth();
  const [apiErrors, setApiErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [termsOpen, setTermsOpen] = React.useState(false);
  const handleOpen = () => setTermsOpen(true);
  const handleClose = () => setTermsOpen(false);

  let history = useHistory();

  return (
    <AuthPagesWrapper label="Sign Up">
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        validationSchema={UserRegistrationValidation}
        onSubmit={(values) => {
          setLoading(true);
          setApiErrors(null);
          setTimeout(() => {
            auth.register(values).then((data) => {
              setLoading(false);
              if (data.errors) {
                setApiErrors(data.errors);
              } else {
                history.push("register-check-email");
              }
            });
          }, 400);
        }}
      >
        {() => (
          <AuthPagesForm>
            <AuthPagesShowErrors errors={apiErrors ?? undefined} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormikTextField
                  formikKey="name"
                  label="Name"
                  autoComplete="name"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <FormikTextField
                  formikKey="email"
                  label="Email Address"
                  autoComplete="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  formikKey="password"
                  label="Password"
                  fullWidth
                  type="password"
                  autoComplete="password"
                />
              </Grid>

              <Grid item xs={12}>
                <FormikTextField
                  formikKey="confirmPassword"
                  label="Confirm Password"
                  fullWidth
                  type="password"
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>

            <Grid
              mt={1}
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <FormikCheckboxField
                  formikKey="allowExtraEmails"
                  color="primary"
                  label="Send me relevant updates via email."
                />
              </Grid>
              <Grid item xs={12}>
                <FormikCheckboxField
                  formikKey="termsAgreed"
                  color="primary"
                  label="I agree to the terms and conditions."
                />
                <Button variant="text" color="secondary" onClick={handleOpen}>
                  View Terms
                </Button>
                <Modal
                  keepMounted
                  open={termsOpen}
                  onClose={handleClose}
                  aria-labelledby="keep-mounted-modal-title"
                  aria-describedby="keep-mounted-modal-description"
                >
                  <Box sx={style}>
                    <TermsAndConditions />
                  </Box>
                </Modal>
              </Grid>
            </Grid>
            <AuthPagesButton label="Sign Up" loading={loading} />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to={"login"}>
                  Already have an account? Login Here.
                </Link>
              </Grid>
            </Grid>
          </AuthPagesForm>
        )}
      </Formik>
    </AuthPagesWrapper>
  );
}
