import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import './Signup.css';
const SignUp = ({ onSignup }) => {
   
    const [errors, setErrors] = useState({});
    const history = useHistory(); // for programmatic navigation

    console.log("Signup component received onSignup prop:", onSignup);

    const onSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData.entries());

        console.log('Form Data:', formObject);

        const validationErrors = validate(formObject);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (formObject.password !== formObject.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Passwords do not match',
            });
            return;
        }


        try {
            // Check if the email already exists
            const checkResponse = await fetch(`http://localhost:8000/users?email=${encodeURIComponent(formObject.email)}`);
            //check the type of check response
            console.log("checkResponse: " ,typeof(checkResponse), checkResponse);

            if (!checkResponse.ok) {
                throw new Error("Failed to check email existence");
            }

            const userExist = await checkResponse.json();
            
            //need to check the logic
            if (userExist.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Email already exists. Please log in.',
                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    footer: '<a href="/form/login-form" class="swal2-link">Log in</a>',
                    showConfirmButton: false,
                  });
                return;
            }

            // Prepare data for submission
            const { confirmPassword, ...userData } = formObject;

            // Make the request to the server
            const response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...userData, loggedIn: true })
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
            history.push('/#hero');
        } catch (err) {
            console.error("Error during signup:", err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again.',
            });
        }
    };


    const validate = (formObject) => {
        const errors = {};

        for (const [key, value] of Object.entries(formObject)) {
            if (!value) {
                errors[key] = `Please fill in the ${key}.`;
            }
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formObject.email)) {
            errors.email = 'Please enter a valid email address.';
        }

        // Validate password strength
        // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        // if (!passwordPattern.test(formObject.password)) {
        //     errors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one digit.';
        // }

        // Validate password match
        if (formObject.password !== formObject.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return errors;
    }

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
                                <form onSubmit={onSubmit} noValidate>
                                    {/* {emailError && <p className="error-message">{emailError}</p>} */}
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        required
                                    />
                                    {errors.username && <p className="error-message">{errors.username}</p>}
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                    />
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Create Password"
                                        required
                                    />
                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

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