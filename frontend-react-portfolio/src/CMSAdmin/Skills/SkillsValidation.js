import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  proficiency: yup
    .string()
    .matches(/^\d+$/, "Proficiency level should be a string of numbers!")
    .required("Proficiency level is required"),
});

export default validationSchema;
