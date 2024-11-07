import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Description is required"),
});

export default validationSchema;
