import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = ({ onSignup }) => {

    const [error, setError] = useState('');
    const history = useHistory(); // for programmatic navigation

    const onSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData.entries());

        console.log('Form Data:', formObject);

        if (formObject.password !== formObject.confirmPassword) {
            setError("Passwords do not match");
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
            return;
        }

        // Handle successful signup
        const user = await response.json();
        console.log("user",user);
        alert("User registered successfully!")
        history.push('/#hero');
         
        if (typeof onSignup === 'function') {
            onSignup(user);
            console.log("user",user);
           
        } else {
            console.error('onSignup is not a function');
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
                                    {/* <label>
                                    <input type="checkbox" checked="checked" name="remember" /> Remember me
                                </label> */}
                                    <div className="sign">
                                        <button className="sign-button" type="submit">SignUp</button>
                                    </div>
                                    {error && <p className="error-message">{error}</p>}
                                    <div className="log">
                                        <p>Already have an account?</p><a href="/form/login-form"><span>Login</span></a>
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