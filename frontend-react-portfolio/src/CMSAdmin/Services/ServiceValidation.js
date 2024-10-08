import * as yup from "yup";

const validationSchema = yup
  .object({
    icon: yup.string().required("Icon is required!"),
    title: yup.string().required("Title is required!"),
    desc: yup.string().required("Description is required!"),
    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
