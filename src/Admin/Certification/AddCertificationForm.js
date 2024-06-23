import Certifications from "../../Components/Certifications";


const AddCertificationForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Certification Data:', formObject);

        e.target.reset();
    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };


    return (
        <>
            <section id="certification-form" className="certification-form form">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Add Certifications Info!</h2>
                        </div>
                        <div className="col-12">
                            <form onSubmit={onSubmit}>

                                <input type="text" name="title" placeholder="Tille of Certificate" required />
                                <input type="text" name="category" placeholder="Category of Certificate" required />
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
            <Certifications title="Certifications" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
        </>
    );
}

export default AddCertificationForm;