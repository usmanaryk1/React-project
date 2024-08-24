import * as yup from "yup";

// const acceptedFileTypes = [
//   "image/png",
//   "image/jpeg",
//   "image/jpg",
//   "image/webp",
// ];
// const FILE_SIZE = 1024 * 1024; // 1MB

const validationSchema = yup
  .object({
    // file: yup.mixed()
    //     .required('Profile Image is required')
    //     .test('fileType', 'Unsupported File Format', value => {
    //         if (!value.length) return true; // attachment is optional
    //         return value && acceptedFileTypes.includes(value[0].type);
    //     })
    //     .test('fileSize', 'File Size is too large', value => {
    //         if (!value.length) return true; // attachment is optional
    //         return value && value[0].size <= FILE_SIZE;
    //     }),

    title: yup.string().required("Title is required"),

    link: yup.string().url("Invalid URL format").required("Link is required"),

    category: yup.string().required("Category is required"),
    date: yup.string().required("Date is required"),

    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
