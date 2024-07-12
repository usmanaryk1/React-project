import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import validationSchema from "./SocialValidation";
import useFetch from "../../Components/useFetch";
import { useState, useEffect } from "react";
import Contact from "../../Components/Contact";

const SocialForm = () => {

    const [currentLinks, setCurrentLinks] = useState(null);
    const { data: links, setData: setLinks, refetch } = useFetch("http://localhost:8000/social");
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            platformIcon: '',
            link: '',
            isActive: false
        }
    })

    useEffect(() => {
        if (currentLinks) {
            setValue('platformIcon', currentLinks.platformIcon);
            setValue('link', currentLinks.link);
            setValue('isActive', currentLinks.isActive);
        } else {
            reset();
        }
    }, [currentLinks, setValue, reset]);

    useEffect(() => {
        console.log('Updated link:', links);
    }, [links]);

    const onSubmit = async (data) => {

        const formData = {
            platformIcon: data.platformIcon,
            link: data.link,
            isActive: data.isActive
        };

        if (currentLinks) {
            // Update service
            const updatedLink = { ...currentLinks, ...formData };
            console.log('Updating service:', updatedLink);
            const response = await fetch(`http://localhost:8000/social/${currentLinks.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedLink),
            });
            const result = await response.json();
            console.log('Updated social response:', result);

            setLinks(links.map(link => link.id === result.id ? result : link));
            console.log('Link after updating: ', links);
            toast.success('Link updated successfully');
        } else {
            // Add new service
            const response = await fetch('http://localhost:8000/social', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('new link: ', result);
                setLinks(prevLinks => [...prevLinks, result]);
                toast.success('Link added successfully');
                refetch(); // Ensure data is refreshed after addition
            } else {
                toast.error('Failed to add Link');
            }

        }
        reset();
        setCurrentLinks(null);
        refetch();
    };

    const onReset = () => {
        reset();
        setCurrentLinks(null)
    };

    const handleEdit = (links) => {
        setCurrentLinks(links);
        console.log('onedit: ', links);
    };

    const handleDelete = async (id) => {
        console.log('Deleting service with ID:', id);
        const response = await fetch(`http://localhost:8000/social/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setLinks(links.filter(links => links.id !== id));
            refetch();
            toast.success('Link deleted successfully');
            console.log('Link deleted successfully', links);
        } else {
            console.error('Failed to delete Link');
            toast.error('Failed to delete Link');
        }
    }

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
                                        name="platformIcon"
                                        {...register('platformIcon')}
                                        placeholder="Icon of Social Media (bi bi-facebook)"
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
            {/* <Hero /> */}
        </>
    );
}

export default SocialForm;