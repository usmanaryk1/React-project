import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  name: yup.string().required("Name cannot be empty"),
  content: yup.string().required("Content cannot be empty."),
});

export default ValidationSchema;
