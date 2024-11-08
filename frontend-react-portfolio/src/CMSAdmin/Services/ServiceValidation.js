import * as yup from "yup";

const validationSchema = yup
  .object({
    title: yup.string().required("Title is required!"),
    desc: yup.string().required("Description is required!"),
    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
