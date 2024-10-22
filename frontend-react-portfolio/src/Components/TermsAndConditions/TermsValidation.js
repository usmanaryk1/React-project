import * as yup from "yup";

// const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/webp, image/jpeg";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Description is required"),
});

export default validationSchema;
