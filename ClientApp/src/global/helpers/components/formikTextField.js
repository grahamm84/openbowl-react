import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export const FormikTextField = ({ formikKey, ...props }) => {
  const [field, meta, helpers] = useField(formikKey);
  return (
    <TextField
      id={field.name}
      name={field.name}
      size={props.size}
      helperText={meta.touched || props.validateAll ? meta.error : ""}
      error={(meta.touched || props.validateAll) && Boolean(meta.error)}
      value={field.value}
      onChange={(value) => {
        helpers.setTouched(field.name);
        field.onChange(value);
      }}
      variant="outlined"
      {...props}
    />
  );
};

FormikTextField.propTypes = {
  size: PropTypes.string,
  validateAll: PropTypes.bool,
  formikKey: PropTypes.string.isRequired,
};
