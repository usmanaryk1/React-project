import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import './Signup.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./SignupValidation";
import { useAuth } from "../AuthContext";

const SignUp = () => {

    const { onSignup } = useAuth();

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })
    const history = useHistory(); // for programmatic navigation

    console.log("Signup component received onSignup prop:", onSignup);


    const checkIfEmailExists = async (email) => {
        const response = await fetch(`http://localhost:8000/users?email=${encodeURIComponent(email)}`);
        if (response.ok) {
            const data = await response.json();
            return data.length > 0;
        }
        throw new Error('Failed to check email existence');
    };

    const checkIfUsernameExists = async (username) => {
        const response = await fetch(`http://localhost:8000/users?username=${encodeURIComponent(username)}`);
        if (response.ok) {
            const data = await response.json();
            return data.length > 0;
        }
        throw new Error('Failed to check username existence');
    };

    const onSubmit = async (data) => {

        console.log('Data', data);

        // check email existance
        try {
            const emailExists = await checkIfEmailExists(data.email);
            if (emailExists) {
                setError('email', {
                    type: 'manual',
                    message: 'Email already exists. Please log in.',
                });
                return;
            }


            // check username existance
            const usernameExists = await checkIfUsernameExists(data.username);
            if (usernameExists) {
                setError('username', {
                    type: 'manual',
                    message: 'Username already exists. Please choose another.',
                });
                return;
            }


            // Prepare data for submission
            const { confirmPassword, ...userData } = data;

            // Add role to userData
            const userWithRole = {
                ...userData,
                role: 'admin', // Assign the role of admin here
                loggedIn: true
            };

            // Make the request to the server
            const response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userWithRole)
            });

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Signup failed. Please try again.',
                });
                return;
            }

            // Handle successful signup
            const user = await response.json();
            console.log("user", user);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User registered successfully!',
            })
            onSignup(user, true);

            history.push('/form/dashboard');
        } catch (err) {
            console.error("Error during signup:", err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again.',
            });
        }
    };


    return (
        <>
            {/* SIGNUP FORM */}
            <section id="signup-form" className="signup-form form bg-image" style={{ backgroundImage: 'url(../assets/img/overlay-bg.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="signup-container">
                            <div className="col-12">
                                <h2>SignUp</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            {...register('username', {
                                                validate: async (value) => {
                                                    const exists = await checkIfUsernameExists(value);
                                                    return !exists || 'Username already exists. Please choose another.';
                                                }
                                            })}
                                            placeholder="Username"
                                            required
                                        />
                                    </div>
                                    {errors.username && <p className="error-message">{errors.username.message}</p>}

                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            {...register('email', {
                                                validate: async (value) => {
                                                    const exists = await checkIfEmailExists(value);
                                                    return !exists || 'Email already exists. Please log in.';
                                                }
                                            })}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    {errors.email && <p className="error-message">{errors.email.message}</p>}

                                    <div className="form-group">
                                        <input
                                            type="password"
                                            name="password"
                                            {...register('password')}
                                            placeholder="Create Password"
                                            required
                                        />
                                    </div>
                                    {errors.password && <p className="error-message">{errors.password.message}</p>}

                                    <div className="from-group">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            {...register('confirmPassword')}
                                            placeholder="Confirm Password"
                                            required
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}

                                    <div className="sign">
                                        <button className="sign-button" type="submit">SignUp</button>
                                    </div>
                                    <div className="log">
                                        <a href="/form/login-form">Already have an account? Login</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUp;