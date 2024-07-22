import Counter from "../../Components/Counter";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./CounterValidation";
import { useState, useEffect  } from "react";
import useFetch from "../../Components/useFetch";

const AddCounterForm = () => {

    const [currentCounter, setCurrentCounter] = useState(null);
    const { data: counts, setData: setCounts, refetch } = useFetch("http://localhost:8000/counts");
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
            counts: '',
            isActive: false
        }
    })

    useEffect(() => {
        if (currentCounter) {
            setValue('title', currentCounter.text);
            setValue('counts', currentCounter.counterEnd);
            setValue('isActive', currentCounter.isActive);
        } else {
            reset();
        }
    }, [currentCounter, setValue, reset]);

    console.log('currentCounter:',currentCounter);

    const onSubmit = async (data) => {

        const formData = {
            text: data.title,
            counterEnd: data.counts,
            isActive: data.isActive,
        };

        if (currentCounter) {
            // Update counter
            const updatedCounter = { ...currentCounter, ...formData };
            const response = await fetch(`http://localhost:8000/counts/${currentCounter.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCounter),
            });
            const result = await response.json();
            console.log('Updated counter response:', result);

            setCounts(counts.map(counter => counter.id === result.id ? result : counter));
            console.log('Updated counter:', counts);
            toast.success('Counter updated successfully');
        } else {
            // Add new counter
            const response = await fetch('http://localhost:8000/counts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Added counter response:', result);
                setCounts(prevCounters => [...prevCounters, result]);
                console.log('Added counter:', counts)
                toast.success('Counter added successfully');
            } else {
                toast.error('Failed to add counter');
            }
        }
        reset();
        setCurrentCounter(null);
        refetch();
    };

    const onReset = (e) => {
        reset();
        setCurrentCounter(null);
    };

    const handleEdit = (counter) => {
        setCurrentCounter(counter);
    };

    const handleDelete = async (id) => {
        console.log('Deleting counter with ID:', id);
        const response = await fetch(`http://localhost:8000/counts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setCounts(counts.filter(counter => counter.id !== id));
            refetch();
            console.log('deleted counter:', counts)
            toast.success('Counter deleted successfully');
        } else {
            toast.error('Failed to delete counter');
        }
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
                                    <div className="form-group">
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        {...register('title')}
                                        placeholder="Title"
                                        required
                                    />
                                    </div>
                                    {errors.title && <p className="error-message">{errors.title.message}</p>}

                                    <div className="form-group">
                                    <input
                                        type="text"
                                        name="counts"
                                        className="form-control"
                                        {...register('counts')}
                                        placeholder="Number of Counts"
                                        required
                                    />
                                    </div>
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
            <Counter 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                counts={counts}
            />
        </>
    );
}

export default AddCounterForm;