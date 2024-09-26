import * as yup from "yup";

const validationSchema = yup
  .object({
    icon: yup.string().required("Icon is required!"),
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
      .matches(/^\d+$/, "Counts should be a string of numbers!")
      .required("Counts are required!"),
    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
