import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = ({ onLogin }) => {
    

    const history = useHistory(); // for programmatic navigation

    console.log("Login component received onLogin prop:", onLogin);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData.entries());

        console.log('Form Data:', formObject);

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
            onLogin(user ,true);
            toast.success('Login Successfully');
            history.push('/form/dashboard');
        } else {
            toast.error("Invalid email or password.");
        }

    };

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
                                <form onSubmit={onSubmit}>
                                    {/* {error && <p className="error-message">{error}</p>} */}
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        required
                                    />

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