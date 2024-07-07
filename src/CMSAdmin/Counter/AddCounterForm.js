import Counter from "../../Components/Counter";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./CounterValidation";


const AddCounterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
            counts: '',
            isActive: false
        }
    })

    const onSubmit = (formObject, e) => {
        e.preventDefault();

        console.log('Service Data:', formObject);

        const updatedData = {
            counterEnd: formObject.counts,
            text: formObject.title,
            id: "1"
        };

        fetch('http://localhost:8000/counts/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                toast.success("Submitted Successfully")

                e.target.reset();  // Reset the form after successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        e.target.reset();
    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };


    return (
        <>
            {/* Counter Form Start */}
            <section id="counter-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="counter-container">
                            <div className="col-12">
                                <h2>Add Counter Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <input
                                        type="text"
                                        name="title"
                                        {...register('title')}
                                        placeholder="Title in Uppercase"
                                        required
                                    />
                                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                                    <input
                                        type="number"
                                        name="counts"
                                        {...register('counts')}
                                        placeholder="Number of Counts"
                                        required
                                    />
                                    {errors.counts && <p className="error-message">{errors.counts.message}</p>}
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
                                    </div>
                                    {errors.isActive && <p className="error-message">{errors.isActive.message}</p>}
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
            {/* Counter Form End */}
            <Counter />
        </>
    );
}

export default AddCounterForm;