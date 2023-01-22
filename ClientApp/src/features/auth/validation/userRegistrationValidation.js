import * as Yup from "yup";

export const UserRegistrationValidation = Yup.object().shape({
  firstName: Yup.string()
    .notRequired()
    .nullable()
    .max(150, "Must not exceed 150 characters."),
  lastName: Yup.string()
    .notRequired()
    .nullable()
    .max(150, "Must not exceed 150 characters."),
  password: Yup.string()
    .required("Required.")
    .min(8, "Password must be 8 chars minimum."),
  email: Yup.string().required("Email address is required.").email(),
  confirmPassword: Yup.string()
    .required("Required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
  termsAgreed: Yup.bool().oneOf([true], "You must accept the terms"),
});
