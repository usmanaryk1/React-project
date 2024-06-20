import { useState } from "react";

const Services = ({ nextStep, addService, prevStep }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [services, setServices] = useState([]);

    const handleAddService = (e) => {
        e.preventDefault();
        const newService = { title, description };
        setServices([...services, newService]);
        setTitle('');
        setDescription('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addService(services);
        nextStep();
    };

    return (
        <>
            <section id="services-form" class="services-form form">
                <h2>Services Info!</h2>
                <a className="add" onClick={handleAddService} href="/" > <span className="bi bi-plus-circle" /></a><br />

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
                    <button className="prev" onClick={prevStep}>Previous</button>
                    <button className="next" onClick={handleSubmit}>Next</button>
                    {/* {isPending && <button disabled>...</button>}  */}
                </form>
                <h5>Here, you can see the all the details you add</h5>
                <ul>
                    {services.map((service, index) => (
                        <li key={index}>
                            {service.title} - {service.description}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Services;