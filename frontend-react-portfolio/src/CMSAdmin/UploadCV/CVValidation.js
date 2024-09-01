import * as yup from "yup";

const validationSchema = yup.object({
  file: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      return value && value[0] && value[0].type === "application/pdf";
    }),
});
export default validationSchema;
