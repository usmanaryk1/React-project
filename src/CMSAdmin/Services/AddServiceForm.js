import { useState, useEffect } from "react";
import useFetch from "../../Components/useFetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./ServiceValidation";
import Services from "../../Components/Services";

const AddServiceForm = () => {

    const [currentService, setCurrentService] = useState(null);
    const { data: services, setData: setServices } = useFetch("http://localhost:8000/services");
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
            desc: '',
            isActive: false
        }
    })

    // console.log('Service List Before Update:', services);

    useEffect(() => {
        if (currentService) {
            setValue('title', currentService.sTitle);
            setValue('desc', currentService.sDescription);
            setValue('isActive', currentService.isActive);
        } else {
            reset();
        }
    }, [currentService, setValue, reset]);

    const onSubmit = async (data) => {
        if (currentService) {
            // Update service
            const updatedService = { ...currentService, ...data };
            const response = await fetch(`http://localhost:8000/services/${currentService.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedService),
            });
            const result = await response.json();
            setServices(services.map(service => service.id === result.id ? result : service));
            toast.success('Service updated successfully');
        } else {
            // Add new service
            const newService = { ...data, id: services.length + 1 }; // Mocking an ID
            const response = await fetch('http://localhost:8000/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newService),
            });
            const result = await response.json();
            setServices([...services, result]);
            toast.success('Service added successfully');
        }
        reset();
        setCurrentService(null);

    };

    const onReset = () => {
        reset();
        setCurrentService(null);
    }

    const handleEdit = (service) => {
        setCurrentService(service);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8000/services/${id}`, {
            method: 'DELETE',
        });
        setServices(services.filter(service => service.id !== id));
    };

    return (
        <>
            {/* Service Form Start */}
            <section id="service-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="service-container">
                            <div className="col-12">
                                <h2>Add Services Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <input
                                        type="text"
                                        name="title"
                                        {...register('title')}
                                        placeholder="Title of Service"
                                        required
                                    />
                                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                                    <textarea
                                        name="desc"
                                        placeholder="Description"
                                        {...register('desc')}
                                        required
                                    ></textarea>
                                    {errors.desc && <p className="error-message">{errors.desc.message}</p>}
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
            {/* Service Form End */}
            <Services onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
}

export default AddServiceForm;