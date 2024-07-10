import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const SignUp = ({ onSignup }) => {

    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const history = useHistory(); // for programmatic navigation

    console.log("Signup component received onSignup prop:", onSignup);

    const onSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData.entries());

        console.log('Form Data:', formObject);


        if (formObject.password !== formObject.confirmPassword) {
            setError("Passwords do not match");
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
                setEmailError("Email already exists. Please log in.");
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Signup failed. Please try again.',
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
                setError("Signup failed. Please try again.");
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
            setError("An error occurred. Please try again.");
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
                                <form onSubmit={onSubmit}>
                                    {emailError && <p className="error-message">{emailError}</p>}
                                    <input
                                        type="text"
                                        name="userName"
                                        placeholder="Username"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Create Password"
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    {error && <p className="error-message">{error}</p>}

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