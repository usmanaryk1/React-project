import * as yup from 'yup';

const validationSchema = yup.object({
    title: yup.string().required('Title is required!'),
    counts: yup.string().required('Counts are required!'),
    isActive: yup.bool().oneOf([true], 'Please check this field').required('Please check this field'),
}).required();

export default validationSchema;