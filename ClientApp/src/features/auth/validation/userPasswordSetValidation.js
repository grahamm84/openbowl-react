import * as Yup from "yup";

export const UserPasswordSetValidation = Yup.object().shape({
  password: Yup.string()
    .required("Required.")
    .min(8, "Password must be 8 chars minimum."),
  confirmPassword: Yup.string()
    .required("Required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
