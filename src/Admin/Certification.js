import { useState } from "react";

const Certification = () => {
    
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    return ( 
         <>
            <section id="certification-form" class="certification-form form">
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
                    <label for="file-upload">Upload Your Certificate Image:</label>
                    <input 
                        type="file" 
                        id="file-upload" 
                        name="file-upload" 
                        accept="image/*"
                        required 
                    />
                        <button>Next</button>
                        {/* {isPending && <button disabled>...</button>}  */}
                </form>
            </section>
        </>
    );
}

export default Certification;