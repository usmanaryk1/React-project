import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  name: yup.string().required("Your name is required"),
  time: yup.string().required("Duration is required"),
  isActive: yup.boolean().oneOf([true], "isActive must be checked"),
});

export default validationSchema;
