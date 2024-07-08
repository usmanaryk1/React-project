import * as yup from 'yup';

const validationSchema = yup.object({
    username: yup.string().required('Missing Username'),
    email: yup.string().required('Missing Email')
        .email('Invalid email formate!')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email domain'),
    password: yup.string().required('Missing Password')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: yup.string().required('Missing Confirm Password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required();

export default validationSchema;