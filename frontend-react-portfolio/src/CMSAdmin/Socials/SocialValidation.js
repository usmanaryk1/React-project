// import * as yup from "yup";

// const validationSchema = yup
//   .object({
//     platformIcon: yup.string().required("Icon is Missing."),
//     link: yup.string().when("platformIcon", {
//       is: "whatsapp",
//       then: yup
//         .string()
//         .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
//         .required("Whatsapp number is required!"),
//       otherwise: yup
//         .string()
//         .url("Please enter a valid URL")
//         .required("Link is required!"),
//     }),
//     isActive: yup
//       .bool()
//       .oneOf([true], "Please check this field")
//       .required("Please check this field"),
//   })
//   .required();

// export default validationSchema;
import * as yup from "yup";

const validationSchema = yup.object({
  platformIcon: yup.string().required("Platform icon is required"),
  link: yup.string().when("platformIcon", {
    is: (platformIcon) => platformIcon === "whatsapp", // Correct condition here
    then: yup
      .string()
      .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
      .required("WhatsApp number is required"),
    otherwise: yup
      .string()
      .url("Please enter a valid URL")
      .required("Link is required"),
  }),
  isActive: yup.boolean().required(),
});

export default validationSchema;
