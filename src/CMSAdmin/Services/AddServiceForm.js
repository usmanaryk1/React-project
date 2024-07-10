import Services from "../../Components/Services";

const AddServiceForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Service Data:', formObject);

        const updatedData = {
            sTitle: formObject.title,
            sDescription: formObject.desc,
            id: "1"
        };

        fetch('http://localhost:8000/services/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("Submitted Successfully")
                e.target.reset();  // Reset the form after successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        e.target.reset();
    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };

    return (
        <>
            {/* Service Form Start */}
            <section id="service-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="service-container">
                            <div className="col-12">
                                <h2>Add Services Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title of Service"
                                        required
                                    />
                                    <textarea
                                        name="desc"
                                        placeholder="Description"
                                        required
                                    ></textarea>

                                    <div className="isActive">
                                        <input
                                            type="checkbox"
                                            id="active"
                                            className="mx-2"
                                            required
                                        />
                                        <label htmlFor="active">
                                            isActive
                                        </label>
                                    </div>

                                    <div className="buttons">
                                        <button className="reset" type="reset" onClick={onReset}>Reset</button>
                                        <button className="cancel">Cancel</button>
                                        <button className="submit" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            {/* Service Form End */}
            <Services title="Services" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
        </>
    );
}

export default AddServiceForm;