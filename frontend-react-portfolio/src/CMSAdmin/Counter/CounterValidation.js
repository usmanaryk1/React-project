import * as yup from "yup";

const validationSchema = yup
  .object({
    title: yup
      .string()
      .required("Title is required!")
      .test(
        "is-not-number",
        "Title should be a string value, not a number!",
        (value) => isNaN(Number(value))
      ),
    counts: yup
      .string()
      .required("Counts are required!")
      .matches(/^\d+$/, "Counts should be a string of numbers!"),

    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
