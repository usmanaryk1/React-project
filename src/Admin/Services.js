import { useState } from "react";

const Services = ({ nextStep }) => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };
    
    return ( 
        <>
            <section id="services-form" class="services-form form">
                <h2>Services Info!</h2>
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
                        <button onClick = {handleSubmit}>Next</button>
                        {/* {isPending && <button disabled>...</button>}  */}
                </form>
            </section>
        </>
    );
}
 
export default Services;