import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  title: yup.string().required("Title cannot be empty"),
  content: yup.string().required("Content cannot be empty."),
});

export default ValidationSchema;
