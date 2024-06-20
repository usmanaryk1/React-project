import { useState } from "react";

const About = ({ nextStep }) => {

    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [desc, setDesc] = useState('');
    const [skill, setSkill] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <>
            <section id="about-form" class="about-form form">
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
                    <label for="skills">Enter Your Skills:</label>
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
                    <label for="file-upload">Upload Your Profile Picture:</label>
                    <input
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        accept="image/*"
                        required
                    />
                    <button className = "next" onClick = {handleSubmit}>Next</button>
                    {/* {isPending && <button disabled>...</button>}  */}
                </form>
            </section>
        </>
    );
}

export default About;