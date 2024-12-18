import * as yup from "yup";
const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required!")
    .test(
      "is-not-number",
      "Name should be a string value, not a number.",
      (value) => isNaN(Number(value))
    ),
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email format.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email domain."
    ),
  subject: yup.string().required("Subject is required!"),
  message: yup.string().required("Message is required!"),
});

export default validationSchema;
