import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ onLogin }) => {

    const [error, setError] = useState('');
    const history = useHistory(); // for programmatic navigation

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

            // onLogin(user);
            console.log("user",user);
            alert('Login Successfully')
            history.push('/#hero');
        } else {
            setError("Invalid email or password.");
        }

        if (typeof onLogin === 'function') {
            onLogin(user);
            console.log("user",user);
           
        } else {
            console.error('onLogin is not a function');
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
                                    {/* <label>
                                    <input type="checkbox" checked="checked" name="remember" /> Remember me
                                </label> */}
                                    <div className="pwd">
                                        <button className="login-button" type="submit">Login</button>
                                        <p><a href="/form/forget-form">Forgot Password?</a></p>
                                    </div>
                                    {error && <p className="error-message">{error}</p>}
                                    <div className="signup-link">
                                        <p>New User?</p><a href="/form/signup-form"><span>SignUp Now</span></a>
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