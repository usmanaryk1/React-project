import { useState, useEffect } from "react";
import useFetch from "../../Components/useFetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./ServiceValidation";
import Services from "../../Components/Services";

const AddServiceForm = () => {

    
    const [currentService, setCurrentService] = useState(null);
    const { data: services, setData: setServices, refetch } = useFetch("http://localhost:8000/services");
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
            desc: '',
            isActive: false
        }
    })

    useEffect(() => {
        if (currentService) {
            setValue('title', currentService.sTitle);
            setValue('desc', currentService.sDescription);
            setValue('isActive', currentService.isActive);
        } else {
            reset();
        }
    }, [currentService, setValue, reset]);

    console.log('currentService: ', currentService);

    const onSubmit = async (data) => {

        const formData = {
            sTitle: data.title,
            sDescription: data.desc,
            isActive: data.isActive,
        };

        try {
            if (currentService) {
                // Update service
                const updatedService = { ...currentService, ...formData };
                const response = await fetch(`http://localhost:8000/services/${currentService.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedService),
                });
                const result = await response.json();
                console.log('Updated service response:', result);

                setServices(services.map(service => service.id === result.id ? result : service));
                console.log(' Update service: ', services);
                toast.success('Service updated successfully');
            } else {
                // Add new service
                const response = await fetch('http://localhost:8000/services', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log('new service: ', result);
                    setServices(prevServices => [...prevServices, result]);
                    console.log('Added service: ', services);
                    toast.success('Service added successfully');
                } else {
                    toast.error('Failed to add service');
                }
            }
        } 
        catch (error) {
            toast.error('Failed to perform the desired task');
        } 
        finally {
                reset();
                setCurrentService(null);
                refetch(); // Ensure data is refreshed
            }
        };

        const onReset = () => {
            reset();
            setCurrentService(null);
        }

        const handleEdit = (service) => {
            setCurrentService(service);
            console.log('oneditClick: ', service);
        };

        const handleDelete = async (id) => {
            console.log('Deleting service with ID:', id);
            const response = await fetch(`http://localhost:8000/services/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setServices(services.filter(service => service.id !== id));
                refetch();
                toast.success('Service deleted successfully');
                console.log('Service deleted successfully', services);
            } else {
                toast.error('Failed to delete service');
            }


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
                                        <div className="form-group">
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            {...register('title')}
                                            placeholder="Title of Service"
                                            required
                                        />
                                        </div>
                                        {errors.title && <p className="error-message">{errors.title.message}</p>}

                                        <div className="form-group">
                                        <textarea
                                            name="desc"
                                            className="form-control"
                                            placeholder="Description"
                                            {...register('desc')}
                                            required
                                        ></textarea>
                                        </div> 
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
                <Services 
                    title="Services" 
                    subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    services={services} 
                />
            </>
        );
    }

    export default AddServiceForm;