import useFetch from "../../Components/useFetch";
import CertificationDetails from "./CertificationDetails";

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

    const { data: certifications } = useFetch("http://localhost:8000/certifications");

    return (
        <>
            <section id="certification-form" className="certification-form form">
                <h2>Add Certifications Info!</h2>

                <form onSubmit={onSubmit}>

                    <input type="text" name="title" placeholder="Tille of Certificate"/>
                    <input type="text" name="category" placeholder="Category of Certificate" />
                    <textarea name="desc" placeholder="Description"></textarea>

                    <button className="reset" type="reset" onClick={onReset}>Reset</button>
                    <button className="cancel">Cancel</button>
                    <button className="submit" type="submit">Submit</button>
                </form>
                <hr />
            </section>
            {certifications && <CertificationDetails certifications={certifications} title="Certifications" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />}
        </>
    );
}

export default AddCertificationForm;