const ResetPwd = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);

    };

    return (
        <>

            <section id="reset-form" className="reset-form form">
                <div className="container">
                    <div className="row">
                        <div className="reset-container">
                            <div className="col-12">
                                <p>Enter your new password below:</p>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>
                                <input type="password" name="password" placeholder="Create Password" required />
                                <input type="password" name="password" placeholder="Confirm Password" required />
                                    <div className="reset">
                                        <button className="reset-button" type="submit">Reset Password</button>
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

export default ResetPwd;