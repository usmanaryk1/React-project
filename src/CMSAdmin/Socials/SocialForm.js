import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import validationSchema from "./SocialValidation";

const SocialForm = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
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
            <section id="social-form" className="social-form form">
                <div className="container">
                    <div className="row">
                        <div className="social-container">
                            <div className="col-12">
                                <h2>Add Social Links!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                                    <input
                                        type="text"
                                        name="platform"
                                        {...register('platform')}
                                        placeholder="Social Media Platform"
                                        required
                                    />
                                    {errors.platform && <p className="error-message">{errors.platform.message}</p>}
                                    <input
                                        type="text"
                                        name="link"
                                        {...register('link')}
                                        placeholder="Link of your accounnt"
                                        required
                                    />
                                    {errors.link && <p className="error-message">{errors.link.message}</p>}
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
                                        <button className="cancel" onClick={onReset}>Cancel</button>
                                        <button className="submit" type="submit">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            {/* <Hero /> */}
        </>
    );
}

export default SocialForm;