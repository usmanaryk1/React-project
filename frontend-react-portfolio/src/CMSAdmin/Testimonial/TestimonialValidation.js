import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Client name is required"),
  desc: yup.string().required("Description is required"),
  isActive: yup
    .bool()
    .oneOf([true], "Please check this field")
    .required("Please check this field"),
});

export default validationSchema;
