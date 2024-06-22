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

                <h2>Add Contact Info!</h2>

                <form onSubmit={onSubmit}>

                    <input type="text" name="desc" placeholder="Description" />
                    <input type="text" name="location" placeholder="Location" />
                    <input type="text" name="number" placeholder="Telephone Number" />
                    <input type="email" name="location" placeholder="Email" />

                    <button className="reset" type="reset" onClick={onReset}>Reset</button>
                    <button className="cancel">Cancel</button>
                    <button className="submit" type="submit">Submit</button>  
                </form>
                <hr />
            </section>
            <Contact />
        </>
    );
}

export default ContactForm;