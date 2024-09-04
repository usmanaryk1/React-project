import * as yup from "yup";

const validationSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required!")
      .email("Invalid email formate!")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email domain"
      ),
  })
  .required();

export default validationSchema;
