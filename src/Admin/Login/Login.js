const Login = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);

    };

    return (
        <>
        {/* login form start contributor1*/}
            <section id="login-form" className="login-form form bg-image" style={{ backgroundImage: 'url(../assets/img/overlay-bg.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="login-container"> 
                            <div className="col-12">
                                <h2>Login</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>

                                    <input type="email" name="email" placeholder="Email or Username" required />
                                    <input type="password" name="password" placeholder="Enter Password" required />
                                    {/* <label>
                                    <input type="checkbox" checked="checked" name="remember" /> Remember me
                                </label> */}
                                    <div className="pwd">
                                        <button className="login-button" type="submit">Login</button>
                                        <p><a href="/form/forget-form">Forgot Password?</a></p>
                                    </div>

                                    <div className="signup-link">
                                        <p>New User?</p><a href="/form/signup-form"><span>SignUp Now</span></a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/* login form end*/}
        </>
    );
}

export default Login;