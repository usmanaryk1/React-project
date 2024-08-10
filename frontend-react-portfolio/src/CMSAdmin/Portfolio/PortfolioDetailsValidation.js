import * as yup from "yup";

const validationSchema = yup
  .object({
    client: yup.string().required("Title is required"),

    link: yup.string().url("Invalid URL format").required("Link is required"),

    category: yup.string().required("Category is required"),
    desc: yup.string().required("Description is required"),

    date: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .required("Date is required"),

    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
