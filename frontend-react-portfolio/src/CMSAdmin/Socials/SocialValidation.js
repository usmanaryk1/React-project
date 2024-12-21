import * as yup from "yup";

const validationSchema = yup.object().shape({
  platformIcon: yup.string().nullable().required("Platform icon is required"),
  link: yup
    .string()
    .required("Link is required")
    .test("isValidLink", "Invalid link or phone number", function (value) {
      const { platformIcon } = this.parent;
      if (platformIcon === "bi-whatsapp") {
        return /^\+?[1-9]\d{1,14}$/.test(value);
      }
      return yup.string().url().isValidSync(value);
    }),
  isActive: yup.boolean().required("Active status is required"),
});

export default validationSchema;
