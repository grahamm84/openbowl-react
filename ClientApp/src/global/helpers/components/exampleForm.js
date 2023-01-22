import { Button, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { exampleValidationsUsingYup } from "./example validations using yup";

// const {
//   exampleValidationsUsingYup,
// } = require("./example validations using yup");

const initialValues = {
  field1: "",
  field2: "",
};
function SampleForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={exampleValidationsUsingYup}
      onSubmit={(values, { setSubmitting }) => {
        // do something here
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setTouched,
        isValid,
        /* and other goodies */
      }) => (
        <Form>
          <Grid container spacing={2}>
            {/* add form fields here */}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary">
            Sample Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
