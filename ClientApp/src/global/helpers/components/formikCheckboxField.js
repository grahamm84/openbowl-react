import React from "react";
import { useField } from "formik";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import PropTypes from "prop-types";

export const FormikCheckboxField = ({ formikKey, ...props }) => {
  const [field, meta, helpers] = useField(formikKey);
  return (
    <FormControl required={meta.required} error={meta.error ? true : false}>
      <FormControlLabel
        control={
          <Checkbox
            checked={field.value}
            name={field.name}
            onChange={field.onChange}
            error={
              (meta.touched || props.validateAll) &&
              Boolean(meta.error ? true : false)
            }
            {...props}
          />
        }
        label={props.label}
      />
      <FormHelperText>{meta.error ?? undefined}</FormHelperText>
    </FormControl>
  );
};

FormikCheckboxField.propTypes = {
  size: PropTypes.string,
  validateAll: PropTypes.bool,
  formikKey: PropTypes.string.isRequired,
  label: PropTypes.string,
};
