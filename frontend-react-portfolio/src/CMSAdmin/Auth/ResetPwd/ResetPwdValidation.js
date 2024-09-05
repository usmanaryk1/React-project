import * as yup from "yup";

const validationSchema = yup
  .object({
    password: yup
      .string()
      .required("Missing Password")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: yup
      .string()
      .required("Missing Confirm Password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

export default validationSchema;
