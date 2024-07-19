import * as yup from 'yup';

// const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/webp, image/jpeg";

const validationSchema = yup.object().shape({
    name: yup.string().required("Client name is required"),
    desc: yup.string().required("Description is required"),
    isActive: yup.boolean().oneOf([true], "isActive must be checked"),
    file: yup
    .mixed()
        .required('Image is required')
});

export default validationSchema;