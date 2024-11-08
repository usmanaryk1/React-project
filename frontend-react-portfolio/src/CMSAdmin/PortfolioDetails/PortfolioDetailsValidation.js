import * as yup from "yup";

const validationSchema = yup
  .object({
    client: yup.string().required("Client Company name is required"),

    link: yup.string().url("Invalid URL format").required("Link is required"),

    category: yup.string().required("Category is required"),
    desc: yup.string().required("Description is required"),

    date: yup
      .string()

      .required("Date is required"),

    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
