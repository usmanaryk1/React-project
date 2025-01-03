import * as yup from "yup";

const validationSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  number: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Phone Number must be 11 digits."),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email domain"
    ),
  isActive: yup.boolean().oneOf([true], "isActive must be checked"),
});

export default validationSchema;
