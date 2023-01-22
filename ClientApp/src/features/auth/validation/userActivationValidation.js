import * as Yup from "yup";

export const UserActivationValidation = Yup.object().shape({
  activationCode: Yup.string().required("Activation code is required."),
});
