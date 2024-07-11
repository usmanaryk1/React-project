import Counter from "../../Components/Counter";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./CounterValidation";
import { useState, useEffect  } from "react";
import useFetch from "../../Components/useFetch";

const AddCounterForm = () => {

    const [currentCounter, setCurrentCounter] = useState(null);
    const { data: counters, setData: setCounters, refetch } = useFetch("http://localhost:8000/counts");
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

    const onSubmit = async (data) => {

        const formData = {
            text: data.title,
            counterEnd: data.counts,
            isActive: data.isActive,
        };


        if (currentCounter) {
            // Update counter
            const updatedCounter = { ...currentCounter, ...formData };
            console.log('Updating counter:', updatedCounter);
            const response = await fetch(`http://localhost:8000/counts/${currentCounter.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCounter),
            });
            const result = await response.json();
            console.log('Updated counter response:', result);

            setCounters(counters.map(counter => counter.id === result.id ? result : counter));
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
                setCounters(prevCounters => [...prevCounters, result]);
                toast.success('Counter added successfully');
                refetch(); // Ensure data is refreshed after addition
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
            setCounters(counters.filter(counter => counter.id !== id));
            refetch();
            toast.success('Counter deleted successfully');
        } else {
            console.error('Failed to delete counter');
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
                                    <input
                                        type="text"
                                        name="title"
                                        {...register('title')}
                                        placeholder="Title"
                                        required
                                    />
                                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                                    <input
                                        type="text"
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
            <Counter onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
}

export default AddCounterForm;