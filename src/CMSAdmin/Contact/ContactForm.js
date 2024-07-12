import Contact from "../../Components/Contact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import validationSchema from "./ContactValidation";
import useFetch from "../../Components/useFetch";
import { useState, useEffect } from "react";
const ContactForm = () => {

    const [currentContact, setCurrentContact] = useState(null);
    const { data: contacts, setData: setContacts, refetch } = useFetch("http://localhost:8000/contact");
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            description: '',
            location: '',
            number: '',
            email: '',
            isActive: false
        }
    });

    useEffect(() => {
        if (currentContact) {
            setValue('description', currentContact.description);
            setValue('location', currentContact.location);
            setValue('number', currentContact.number);
            setValue('email', currentContact.email);
            setValue('isActive', currentContact.isActive);
        } else {
            reset();
        }
    }, [currentContact, setValue, reset]);

    useEffect(() => {
        console.log('Updated services:', contacts);
    }, [contacts]);

    const onSubmit = async (data) => {

        const formData = {
            description: data.description,
            location: data.location,
            number: data.number,
            email: data.email,
            isActive: data.isActive
        };

        if (currentContact) {
            // Update contact
            const updatedContact = { ...currentContact, ...formData };
            console.log('Updating contact:', updatedContact);
            const response = await fetch(`http://localhost:8000/contact/${currentContact.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedContact),
            });
            const result = await response.json();
            console.log('Updated contact response:', result);

            setContacts(contacts.map(contact => contact.id === result.id ? result : contact));
            console.log('Contacts after updating: ', contacts);
            toast.success('Contacts updated successfully');
        } else {
            // Add new service
            const response = await fetch('http://localhost:8000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('new service: ', result);
                setContacts(prevContacts => [...prevContacts, result]);
                toast.success('Contact added successfully');
                refetch(); // Ensure data is refreshed after addition
            } else {
                toast.error('Failed to add Contact');
            }

        }
        reset();
        setCurrentContact(null);
        refetch();
    };

    const onReset = () => {
        reset();
        setCurrentContact(null);
    }

    const handleEdit = (contact) => {
        setCurrentContact(contact);
        console.log('onedit: ', contact);
    };

    const handleDelete = async (id) => {
        console.log('Deleting service with ID:', id);
        const response = await fetch(`http://localhost:8000/contact/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setContacts(contacts.filter(contact => contact.id !== id));
            refetch();
            toast.success('Contact deleted successfully');
            console.log('Contact deleted successfully', contacts);
        } else {
            console.error('Failed to delete service');
            toast.error('Failed to delete service');
        }
    }
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
                                    <div className="form-froup">
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            {...register("description")}
                                            placeholder="Description"
                                            required
                                        />
                                    </div>

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
                                        <button className="submit" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <Contact onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
}

export default ContactForm;