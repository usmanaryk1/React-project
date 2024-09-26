import * as yup from "yup";

const validationSchema = yup
  .object({
    title: yup.string().required("Title is required"),

    link: yup.string().url("Invalid URL format").required("Link is required"),

    category: yup.string().required("Category is required"),
    date: yup.string().required("Date is required"),

    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
