import Contact from "../../Components/Contact";

const ContactForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);

    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };

    return (
        <>
            <section id="contact-form" className="contact-form form">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Add Contact Info!</h2>
                        </div>
                        <div className="col-12">
                            <form onSubmit={onSubmit}>

                                <input type="text" name="desc" placeholder="Description" required />
                                <input type="text" name="location" placeholder="Location" required />
                                <input type="text" name="number" placeholder="Telephone Number" required />
                                <input type="email" name="location" placeholder="Email" required />

                                <button className="reset" type="reset" onClick={onReset}>Reset</button>
                                <button className="cancel">Cancel</button>
                                <button className="submit" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <Contact />
        </>
    );
}

export default ContactForm;