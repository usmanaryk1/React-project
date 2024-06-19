import { useState } from "react";

const Portfolio = ({ nextStep }) => {
    
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <>
            <section id="portfolio-form" class="portfolio-form form">
                <h2>Portfolio Info!</h2>
                <form>
                    <label>Add title of Project</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Share Link of Project</label>
                    <input
                        type="text"
                        required
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <label>Add the category of Project</label>
                    <input
                        type="text"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <label for="file-upload">Upload Your Project Image:</label>
                    <input 
                        type="file" 
                        id="file-upload" 
                        name="file-upload" 
                        accept="image/*" 
                        required
                    />
                        <button onClick = {handleSubmit}>Next</button>
                        {/* {isPending && <button disabled>...</button>}  */}
                </form>
            </section>
        </>
    );
}
 
export default Portfolio;