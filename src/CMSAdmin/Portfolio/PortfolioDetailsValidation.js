import * as yup from 'yup';

const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const FILE_SIZE = 1024 * 1024; // 1MB

const validationSchema = yup.object({
    file1: yup.mixed()
        .required('Image1 is required')
        .test('fileType', 'Unsupported File Format', value => {
            if (!value.length) return true; // attachment is optional
            return value && acceptedFileTypes.includes(value[0].type);
        })
        .test('fileSize', 'File Size is too large', value => {
            if (!value.length) return true; // attachment is optional
            return value && value[0].size <= FILE_SIZE;
        }),

    file2: yup.mixed()
        .required('Image2 is required')
        .test('fileType', 'Unsupported File Format', value => {
            if (!value.length) return true; // attachment is optional
            return value && acceptedFileTypes.includes(value[0].type);
        })
        .test('fileSize', 'File Size is too large', value => {
            if (!value.length) return true; // attachment is optional
            return value && value[0].size <= FILE_SIZE;
        }),

    file3: yup.mixed()
        .required('Image1 is required')
        .test('fileType', 'Unsupported File Format', value => {
            if (!value.length) return true; // attachment is optional
            return value && acceptedFileTypes.includes(value[0].type);
        })
        .test('fileSize', 'File Size is too large', value => {
            if (!value.length) return true; // attachment is optional
            return value && value[0].size <= FILE_SIZE;
        }),
    name: yup.string().required('Title is required'),

    link: yup.string()
        .url('Invalid URL format')
        .required('Link is required'),

    category: yup.string().required('Category is required'),
    desc: yup.string().required('Description is required'),

    date: yup.date()
        .required('Date is required'),

    isActive: yup.bool().oneOf([true], 'Please check this field').required('Please check this field'),

}).required();

export default validationSchema;