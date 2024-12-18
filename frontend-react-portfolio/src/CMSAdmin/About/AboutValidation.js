import * as yup from "yup";

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required("Missing Name")
      .test(
        "is-not-number",
        "Name should be a string value, not a number!",
        (value) => isNaN(Number(value))
      ),
    profile: yup.string().required("Missing Profile"),
    email: yup
      .string()
      .required("Missing Email")
      .email("Invalid email formate!")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email domain"
      ),
    phone: yup
      .string()
      .required("Missing Phone Number")
      .matches(
        /^[0-9]{11}$/,
        "Phone number must be 11 digits. Alphabates are not allowed."
      ),
    desc: yup.string().required("Missing Description"),
    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
