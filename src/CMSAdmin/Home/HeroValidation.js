import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().required('Missing Name'),
    skills: yup.string().required('Missing Skills'),
    isActive: yup.bool().oneOf([true], 'Please check this field').required('Please check this field'),
}).required();

export default validationSchema;