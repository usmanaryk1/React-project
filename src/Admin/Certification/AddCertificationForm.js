import { useState } from "react";
import CertificationDetails from "./CertificationDetails";

const AddCertificationForm = () => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const details = { title, description, category, file };

    const onSubmit = (e) => {
        e.preventDefault();
        onReset(e);
    };

    const onReset = (e) => {
        e.preventDefault();
        setTitle('');
        setDescription('');
        setCategory('');
        setFile(null);
    };

    return (
        <>
            <section id="certification-form" className="certification-form form">
                <h2>Certifications Info!</h2>
                <form>
                    <label>Add title of Certificate</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Add Description of Certificate</label>
                    <input
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Add the category of Certificate</label>
                    <input
                        type="text"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <label>Upload Your Certificate Image:</label>
                    <input
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <button className="reset" onClick={onReset}>Reset</button>
                    <button className="cancel">Cancel</button>
                    <button className="submit" onClick={onSubmit}>Submit</button>
                    {/* {isPending && <button disabled>...</button>}  */}
                </form>
                <CertificationDetails details={details}/>
            </section>
        </>
    );
}

export default AddCertificationForm;