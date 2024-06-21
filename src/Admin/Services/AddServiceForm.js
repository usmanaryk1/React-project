import { useState } from "react";
import ServiceDetails from "./ServiceDetails";

const AddServiceForm = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const details = {title, description };

    const onSubmit = (e) => {
        e.preventDefault();
        onReset(e);
    };

    const onReset = (e) => {
        e.preventDefault();
        setTitle('');
        setDescription('');
    };
    return (
        <>
            <section id="services-form" className="services-form form">
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
                    <button className="reset" onClick={onReset}>Reset</button>
                    <button className="cancel">Cancel</button>
                    <button className="submit" onClick={onSubmit}>Submit</button>
                    {/* {isPending && <button disabled>...</button>}  */}
                </form>
                <ServiceDetails details={details}/>
            </section>
        </>
    );
}

export default AddServiceForm;