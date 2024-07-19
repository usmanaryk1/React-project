import * as yup from 'yup';

const validationSchema = yup.object({
    platformIcon: yup.string().required('Missing Name'),
    link: yup.string()
        .url('Invalid URL format')
        .required('Link is required'),
    isActive: yup.bool().oneOf([true], 'Please check this field').required('Please check this field'),
}).required();

export default validationSchema;