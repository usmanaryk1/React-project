import Hero from "../../Components/Hero";

const HeroForm = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);

        const updatedData = {
            name: formObject.name,
            skills: formObject.skills,
            id: "1"
        };

        fetch('http://localhost:8000/hero/1', {
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
            <section id="hero-form" className="hero-form form">
                <div className="container">
                    <div className="row">
                        <div className="hero-container">
                            <div className="col-12">
                                <h2>Add Home Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="skills"
                                        placeholder="Designer, Developer, Freelancer, Photographer"
                                        required
                                    />
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
            <Hero />
        </>
    );
}

export default HeroForm;