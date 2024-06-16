import { useState } from "react";

const About = () => {

    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [desc, setDesc] = useState('');
    const [skill, setSkill] = useState('');
    console.log("object");
    return (
        <>
            <section id="about-form" class="about-form">
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
                    <label for="skills">Choose Your Skills:</label>
                    <select 
                    id="skills" 
                    name="options[]" 
                    
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    >
                        <option value="HTML">HTML5</option>
                        <option value="CSS">CSS3</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Bootstrap">Bootstrap5</option>
                        <option value="Tailwind">Tailwind</option>
                        <option value="React">React</option>
                        <option value="Angular">Angular</option>
                        <option value="Laravel">Laravel</option>
                        <option value="Python">Python</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Vue">Vue</option>
                        <option value="PHP">PHP</option>
                        <option value="Swift">Swift</option>
                        <option value="Jquery">Jquery</option>
                        <option value="SQL">SQL</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                    </select>
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
                    />
                        <button>Next</button>
                        {/* {isPending && <button disabled>...</button>}  */}
                </form>
            </section>
        </>
    );
}

export default About;