import * as Yup from "yup";

export const CreateLeagueValidation = Yup.object().shape({
  // String Validation:
  leagueName: Yup.string()
    .required("League name is required")
    .max(100, "must not exceed 100 characters")
    .min(3, "must be over 3 characters"),

  // captureKeyOverride: Yup.string()
  //   .notRequired()
  //   .max(20, "Capture Key must not exceed 20 characters")
  //   .min(6, "Capture Key must be over 6 characters"),
});
