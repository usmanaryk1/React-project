import * as yup from "yup";

const validationSchema = yup.object().shape({
  number: yup
    .string()
    .matches(/^[0-9]{11}$/, "Phone Number must be 11 digits."),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email domain"
    ),
  isActive: yup.boolean().oneOf([true], "isActive must be checked"),
});

export default validationSchema;
