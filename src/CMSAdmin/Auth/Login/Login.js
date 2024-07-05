import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = ({ onLogin }) => {

    const [errors, setErrors] = useState({});
    const history = useHistory(); // for programmatic navigation

    console.log("Login component received onLogin prop:", onLogin);

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


        const response = await fetch('http://localhost:8000/users');
        const users = await response.json();

        // Check if the credentials match any user
        const user = users.find(user =>
            (user.email === formObject.email) &&
            user.password === formObject.password
        );

        if (user) {
            // Update user status and redirect
            await fetch(`http://localhost:8000/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loggedIn: true })
            });

            console.log("user", user);
            onLogin(user, true);
            toast.success('Login Successfully');
            history.push('/form/dashboard');
        } else {
            toast.error("Invalid email or password.");
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

        return errors;
    }

    return (
        <>
            <section id="login-form" className="login-form form bg-image" style={{ backgroundImage: 'url(../assets/img/overlay-bg.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="login-container">
                            <div className="col-12">
                                <h2>Login</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit} noValidate>
                                    {/* {error && <p className="error-message">{error}</p>} */}
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
                                        placeholder="Enter Password"
                                        required
                                    />
                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                    {/* <p className="error-message">{formError.password}</p> */}
                                    <div className="pwd">
                                        <button className="login-button" type="submit">Login</button>
                                        <p><a href="/form/forget-form">Forgot Password?</a></p>
                                    </div>

                                    <div className="signup-link text-center">
                                        <a href="/form/signup-form">New User? SignUp</a>
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

export default Login;