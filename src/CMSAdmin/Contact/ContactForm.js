import Contact from "../../Components/Contact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import validationSchema from "./ContactValidation";

const ContactForm = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            description: '',
            location: '',
            number: '',
            email: '',
            isActive: false
        }
    });


    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);
        const updatedData = {
            description: formObject.description,
            location: formObject.location,
            number: formObject.number,
            email: formObject.email,
            id: "1"
        };

        fetch('http://localhost:8000/contact/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                toast.success('Submited successfully!');
                reset();  // Reset the form after successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    };

    const onReset = (e) => {
        e.preventDefault();
        reset();
    };

    return (
        <>
            <section id="contact-form" className="contact-form form" style={{ backgroundImage: 'url(assets/img/overlay-bg.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="contact-container">
                            <div className="col-12">
                                <h2>Add Contact Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                                    <input 
                                        type="text" 
                                        name="description" 
                                        {...register("description")}
                                        placeholder="Description" 
                                        required 
                                    />
                                    {errors.description && <p className="error-message">{errors.description.message}</p>}
                                    <input 
                                        type="text" 
                                        name="location" 
                                        {...register("location")}
                                        placeholder="Location" 
                                        required 
                                    />
                                    {errors.location && <p className="error-message">{errors.location.message}</p>}
                                    <input 
                                        type="text" 
                                        name="number"
                                        {...register("number")} 
                                        placeholder="Telephone Number" 
                                        required 
                                    />
                                    {errors.number && <p className="error-message">{errors.number.message}</p>}
                                    <input 
                                        type="email" 
                                        name="email" 
                                        {...register("email")}
                                        placeholder="Email" 
                                        required 
                                    />
                                    {errors.email && <p className="error-message">{errors.email.message}</p>}

                                    <div className="isActive">
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            name=""
                                            {...register("isActive")}
                                            className="mx-2"
                                            required
                                        />
                                        <label htmlFor="active">
                                            isActive
                                        </label>
                                        {errors.isActive && <p className="error-message">{errors.isActive.message}</p>}
                                    </div>

                                    <div className="buttons">
                                        <button className="reset" type="reset" onClick={onReset}>Reset</button>
                                        <button className="cancel">Cancel</button>
                                        <button className="submit" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <Contact />
        </>
    );
}

export default ContactForm;