import { useState } from "react";
import AboutDetails from "./AboutDetails";

const AddForm = () => {

    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [desc, setDesc] = useState('');
    const [skill, setSkill] = useState('');
    const [file, setFile] = useState(null);
    const details = { name, profile, email, phone, desc, skill, file };

    const onSubmit = (e) => {
        e.preventDefault();
        onReset(e);
    };

    const onReset = (e) => {
        e.preventDefault();
        setName('');
        setProfile('');
        setEmail('');
        setPhone('');
        setDesc('');
        setSkill('');

    };

    return (
        <>
            <section id="about-form" className="about-form form">
                <h2>About Info!</h2>
                <form>
                    <label>Name:</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Profile:</label>
                    <input
                        type="text"
                        required
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                    />
                    <label>Email:</label>
                    <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label>Enter Your Skills:</label>
                    <input
                        type="text"
                        required
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                    />
                    <label>Description</label>
                    <textarea
                        required
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    <label>Upload Your Profile Picture:</label>
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

                    <AboutDetails details={details} /> 
                </form>
            </section>
        </>
    );
}

export default AddForm;