const ForgetPwd = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);

    };

    return (
        <>

            <section id="forget-form" className="forget-form form bg-image" style={{ backgroundImage: 'url(../assets/img/overlay-bg.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="forget-container">
                            <div className="col-12">
                                <p>Please enter your username or email address. You will recieve a link to create a new password via email.</p>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>
                                    <input type="email" name="email" placeholder="Email or Username" required />

                                    <div className="forget">
                                        <button className="get-button" type="submit">Get Password</button>
                                        <a href="/form/reset-form">Reset Password</a>
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

export default ForgetPwd;