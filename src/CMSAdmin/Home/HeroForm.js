import Hero from "../../Components/Hero";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import validationSchema from "./HeroValidation";
import { useState, useEffect } from "react";
import useFetch from "../../Components/useFetch";
import { useRef } from "react";
const HeroForm = () => {


    const childRef = useRef();
    const [currentHero, setCurrentHero] = useState(null);
    const { data: hero, setData: setHero } = useFetch("http://localhost:8000/hero");
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            skills: '',
            isActive: false
        }
    })

    

    useEffect(() => {
        if (currentHero) {
            setValue('name', currentHero.name);
            setValue('skills', currentHero.skills);
            setValue('isActive', currentHero.isActive);
        } else {
            reset();
        }
    }, [currentHero, setValue, reset ]);
    console.log('hero before submit: ', currentHero);

    const onSubmit = async (data) => {

        const formData = {
            name: data.name,
            skills: data.skills,
            isActive: data.isActive,
        };
        if (currentHero) {
            // Update hero
            const updatedHero = { ...currentHero, ...formData };
            const response = await fetch(`http://localhost:8000/hero/${currentHero.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedHero),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Updated hero response:', result);
                setHero(prevHero => {
                    console.log('Previous Hero:', prevHero);
                    return prevHero.map(heroData => heroData.id === result.id ? result : heroData
                    );
                });

                childRef.current.childFunction();
                toast.success('Content updated successfully');
            }
            
        } else {
            // Add new service
            const response = await fetch('http://localhost:8000/hero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('new hero: ',result);
                setHero(prevHero => [...prevHero, result]);
                childRef.current.childFunction();
                toast.success('Hero added successfully');
            } else {
                toast.error('Failed to add Hero');
            }
    
        }
        reset();
        setCurrentHero(null);

    };

    useEffect(() => {
        console.log('hero after Updated :', hero);
    }, [hero]);

    const onReset = () => {
        reset();
        setCurrentHero(null);
    };

    const handleEdit = (heroItem) => {
        setCurrentHero(heroItem);
        console.log('onedit: ', heroItem);
    };

    const handleDelete = async (id) => {
        console.log('Deleting service with ID:', id);
        const response = await fetch(`http://localhost:8000/hero/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setHero(prevHero => prevHero.filter(heroData => heroData.id !== id));
            childRef.current.childFunction();
            toast.success('Hero section deleted successfully');
            console.log('Hero section deleted successfully', hero);
        } else {
            console.error('Failed to delete section');
            toast.error('Failed to delete hero section');
        }
        

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
                                        <button className="reset" type="button" onClick={onReset}>Reset</button>
                                        <button className="submit btn btn-success" type="submit">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <Hero onEditClick={handleEdit} onDelete={handleDelete}  ref={childRef} hero={setHero} />
        </>
    );
}

export default HeroForm;