import * as Yup from "yup";

export const UserPasswordResetValidation = Yup.object().shape({
  emailAddress: Yup.string().required("Email address is required.").email(),
});
