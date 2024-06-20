import { useState } from "react";

const Certification = ({prevStep, addCertificate}) => {
    
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [certification, setCertification] = useState([]);

    const handleAddPortfolio = (e) => {
        e.preventDefault();
        const newPortfolio = { title, description, category };
        setCertification([...certification, newPortfolio]);
        setTitle('');
        setDescription('');
        setCategory('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCertificate(certification);
    };


    return ( 
         <>
            <section id="certification-form" class="certification-form form">
                <h2>Certifications Info!</h2>
                <a className="add" onClick={handleAddPortfolio} href="/" > <span className="bi bi-plus-circle" /></a><br />

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
                    <label for="file-upload">Upload Your Certificate Image:</label>
                    <input 
                        type="file" 
                        id="file-upload" 
                        name="file-upload" 
                        accept="image/*"
                        required 
                    />
                        <button className = "prev" onClick={prevStep}>Previous</button>
                        <button className = "next" onClick={handleSubmit}>Next</button>
                        {/* {isPending && <button disabled>...</button>}  */}
                </form>
                <h5>Here, you can see the all the details you add</h5>
                <ul>
                    {certification.map((certifications, index) => (
                        <li key={index}>
                            {certifications.title} - {certifications.description} - {certifications.category}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Certification;