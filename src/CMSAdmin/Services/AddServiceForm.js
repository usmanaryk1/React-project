import { useState, useEffect } from "react";
import useFetch from "../../Components/useFetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./ServiceValidation";
import Services from "../../Components/Services";

const AddServiceForm = ({ serviceToEdit }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
            desc: '',
            isActive: false
        }
    })
    // const [errors, setErrors] = useState({});
    const { data: services, setData: setServices } = useFetch("http://localhost:8000/services");

    const [formObject, setFormObject] = useState({
        title: "",
        desc: "",
        isActive: false
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (serviceToEdit) {
            setFormObject({
                title: serviceToEdit.sTitle || "",
                desc: serviceToEdit.sDescription || "",
                isActive: serviceToEdit.isActive || false
            });
            setIsEditing(true);
        } else {
            setFormObject({
                title: "",
                desc: "",
                isActive: false
            });
            setIsEditing(false);
        }
    }, [serviceToEdit]);

    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormObject(prevFormObject => ({
            ...prevFormObject,
            [name]: value
        }));
    };
    console.log('Service List Before Update:', services);

    const onSubmit = async (formObject, e) => {
        e.preventDefault();

        const updatedServiceData = {
            sTitle: formObject.title,
            sDescription: formObject.desc,
            isActive: formObject.isActive
        };

        if (isEditing) {
            // Update existing service
            const response = await fetch(`http://localhost:8000/services/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formObject)
            });
            console.log('Editing ID:', editingId);
            const updatedService = await response.json();
            console.log('updated service: ', updatedService);

            setServices(prevServices =>
                prevServices.map(service =>
                    service.id === editingId ? updatedService : service
                )
            );
            console.log('new updated service: ', services);
            toast.success('Service updated successfully');
        } else {
            // Add new service
            const response = await fetch("http://localhost:8000/services", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedServiceData)
            });
            const newService = await response.json();

            console.log('new service: ', newService);

            setServices(prevServices => [...prevServices, newService]);

            console.log('Added service: ', services);

            toast.success('Service added successfully');
        }

        // Reset form
        setFormObject({ title: "", desc: "", isActive: false });
        setIsEditing(false);
        setEditingId(null);
    };

    // const onEdit = (service) => {
    //     setFormObject({
    //         title: service.sTitle || "",
    //         desc: service.sDescription || ""
    //         // isActive: service.isActive || false
    //     });
    //     setIsEditing(true);
    //     setEditingId(service.id);
    // };

    // const onDelete = async (id) => {
    //     await fetch(`http://localhost:8000/services/${id}`, {
    //         method: 'DELETE'
    //     });

    //     setServices(services.filter(service => service.id !== id));
    //     toast.error('Service deleted successfully');
    // };

    const onReset = (e) => {
        e.preventDefault();
        setFormObject({
            title: '',
            desc: '',
            isActive: false,
            id: null
        });
        setIsEditing(false);
        setEditingId(null);
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
                                        value={formObject.title || ""}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                                    <textarea
                                        name="desc"
                                        placeholder="Description"
                                        {...register('desc')}
                                        value={formObject.desc || ""}
                                        onChange={handleChange}
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
                                            checked={formObject.isActive}
                                            onChange={handleChange}
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
            <Services />
        </>
    );
}

export default AddServiceForm;