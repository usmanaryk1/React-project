import Contact from "../../Components/Contact";

const ContactForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);
        const updatedData = {
            description: formObject.description,
            location: formObject.location,
            number: formObject.number,
            email: formObject.email,
            id: "1"
        };

        fetch('http://localhost:8000/contact/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                e.target.reset();  // Reset the form after successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        e.target.reset(e);
    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };

    return (
        <>
            <section id="contact-form" className="contact-form form" style={{ backgroundImage: 'url(assets/img/overlay-bg.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="contact-container">
                            <div className="col-12">
                                <h2>Add Contact Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>

                                    <input type="text" name="description" placeholder="Description" required />
                                    <input type="text" name="location" placeholder="Location" required />
                                    <input type="text" name="number" placeholder="Telephone Number" required />
                                    <input type="email" name="email" placeholder="Email" required />

                                    <button className="reset" type="reset" onClick={onReset}>Reset</button>
                                    <button className="cancel">Cancel</button>
                                    <button className="submit" type="submit">Submit</button>
                                </form>
                            </div>
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