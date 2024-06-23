const SignUp = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);

    };

    return (
        <>

            <section id="signup-form" className="signup-form form">
                <div className="container">
                    <div className="row">
                        <div className="signup-container">
                            <div className="col-12">
                                <h2>SignUp</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>

                                    <input type="text" name="userName" placeholder="Username" required />
                                    <input type="email" name="email" placeholder="Email" required />
                                    <input type="password" name="password" placeholder="Create Password" required />
                                    <input type="password" name="password" placeholder="Confirm Password" required />
                                    {/* <label>
                                    <input type="checkbox" checked="checked" name="remember" /> Remember me
                                </label> */}
                                    <div className="sign">
                                        <button className="sign-button" type="submit">SignUp</button>
                                    </div>

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