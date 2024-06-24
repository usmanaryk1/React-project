import Services from "../../Components/Services";

const AddServiceForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Service Data:', formObject);

        e.target.reset();
    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };

    return (
        <>
            <section id="service-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Services Info!</h2>
                        </div>
                        <div className="col-12">
                            <form onSubmit={onSubmit}>
                                <input type="text" name="title" placeholder="Title of Service" required />
                                <textarea name="desc" placeholder="Description" required></textarea>

                                <button className="reset" type="reset" onClick={onReset}>Reset</button>
                                <button className="cancel">Cancel</button>
                                <button className="submit" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <Services title="Services" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
        </>
    );
}

export default AddServiceForm;