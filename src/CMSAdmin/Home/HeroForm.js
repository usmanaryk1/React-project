import Hero from "../../Components/Hero";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import validationSchema from "./HeroValidation";

const HeroForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            skills: '',
            isActive: false
        }
    })

    const onSubmit = async (formObject, e) => {
        e.preventDefault();
        console.log('Data: ', formObject);

        const updatedData = {
            name: formObject.name,
            skills: formObject.skills,
            id: "1"
        };

        fetch('http://localhost:8000/hero/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                toast.success('Data updated successfully');

                e.target.reset();  // Reset the form after successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        e.target.reset(e);
    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };

    return (
        <>
            <section id="hero-form" className="hero-form form">
                <div className="container">
                    <div className="row">
                        <div className="hero-container">
                            <div className="col-12">
                                <h2>Add Home Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                                    <input
                                        type="text"
                                        name="name"
                                        {...register('name')}
                                        placeholder="Full Name"
                                        required
                                    />
                                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                                    <input
                                        type="text"
                                        name="skills"
                                        {...register('skills')}
                                        placeholder="Designer, Developer, Freelancer, Photographer"
                                        required
                                    />
                                    {errors.skills && <p className="error-message">{errors.skills.message}</p>}
                                    <div className="isActive">
                                        <input
                                            type="checkbox"
                                            id="active"
                                            name="isActive"
                                            {...register('isActive')}
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
            <Hero />
        </>
    );
}

export default HeroForm;