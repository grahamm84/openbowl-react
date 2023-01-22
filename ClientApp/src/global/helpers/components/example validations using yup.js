import * as Yup from "yup";

export const exampleValidationsUsingYup = Yup.object().shape({
  // String Validation:
  firstName: Yup.string()
    .notRequired()
    .nullable()
    .max(150, "must not exceed 150 characters"),

  // Date Validation
  startDate: Yup.date()
    .typeError("Invalid Date")
    .required("Start Date is Required"),

  // Date Validation Based on Another Date
  endDate: Yup.date()
    .optional()
    .nullable()
    .default(undefined)
    .typeError("Invalid Date")
    .when(
      "startDate",
      (startDate, schema) =>
        startDate &&
        schema.min(startDate, "End Date must be after the Start Date")
    ),

  // Number Validation
  thisNumber: Yup.number()
    .required("thisNumber is Required")
    .positive("thisNumber must be more than 0")
    .max(10000, "thisNumber must be less than 10,000"),

  // Number validation using nulls and between 2 numbers
  betweenTwo: Yup.number()
    .integer("number must be a whole number")
    .nullable()
    .notRequired()
    .transform((num) => (isNaN(num) ? undefined : num))
    .min(0, "must be between 0 and 12")
    .max(12, "must be between 0 and 12"),

  // conditional string

  field1: Yup.string()
    .nullable()
    .when("field2", {
      is: "YES",
      then: Yup.string().required("field 1 is required"),
    })
    .when("field2", {
      is: "NO",
      then: Yup.string().notRequired(),
    }),

  // bool validation
  boolValue: Yup.bool().oneOf([true], "Must be true"),
});
