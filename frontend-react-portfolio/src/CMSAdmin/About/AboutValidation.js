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
    name: yup
      .string()
      .required("Missing Name")
      .test(
        "is-not-number",
        "Title should be a string value, not a number!",
        (value) => isNaN(Number(value))
      ),
    profile: yup.string().required("Missing Profile"),
    email: yup
      .string()
      .required("Missing Email")
      .email("Invalid email formate!")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email domain"
      ),
    phone: yup
      .string()
      .required("Missing Phone Number")
      .matches(
        /^[0-9]{11}$/,
        "Phone number must be 10 digits. Alphabates are not allowed."
      ),
    desc: yup.string().required("Missing Description"),
    isActive: yup
      .bool()
      .oneOf([true], "Please check this field")
      .required("Please check this field"),
  })
  .required();

export default validationSchema;
