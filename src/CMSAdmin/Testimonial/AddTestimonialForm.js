import { useRef, useState, useEffect } from "react";
import Testimonial from "../../Components/Testimonial";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./TestimonialValidation";
import useFetch from "../../Components/useFetch";

const AddTestimonialForm = () => {

    const [currentTestimonial, setCurrentTestimonial] = useState(null);
    const { data: testimonials, setData: setTestimonials, refetch } = useFetch("http://localhost:8000/testimonials");
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            file: '',
            name: '',
            desc: '',
            isActive: false
        }
    });

    const [image, setImage] = useState(null);
    const imageRef = useRef(null);
    const [base64Image, setBase64Image] = useState("");

    const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/webp, image/jpeg";

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBase64Image(base64);
        console.log("base64", base64);
        setImage(file);
    };


    const handleImageClick = () => {
        document.getElementById('file-input').click();
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader(file);
            reader.readAsDataURL(file);

            reader.onload = () => {

                resolve(reader.result);
            }

            reader.onerror = (error) => {
                reject(error);
            }
        })

    }

    useEffect(() => {
        if (currentTestimonial) {
            setValue('name', currentTestimonial.name);
            setValue('desc', currentTestimonial.description);
            setValue('isActive', currentTestimonial.isActive);
            setBase64Image(currentTestimonial.img);
            setImage(null); // or set to a placeholder if needed
        } else {
            reset();
        }
    }, [currentTestimonial, setValue, reset]);

    const onSubmit = async (formObject, e) => {
        e.preventDefault();

        formObject.img = base64Image; // Add the base64 image to the form object

        console.log('Form Data:', formObject);

        let imageUrl = formObject.img;

        // If a new image is selected, upload it
        if (image) {
            const imageFormData = new FormData();
            imageFormData.append('file', image);

            try {
                const response = await fetch('http://localhost:8000/upload', {
                    method: 'POST',
                    body: imageFormData
                });
                const data = await response.json();
                imageUrl = data.url; // Assuming the server responds with the URL of the uploaded image
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        }

        const updatedData = {
            name: formObject.name,
            description: formObject.desc, // Assuming all desc is in one textarea
            img: imageUrl,
            isActive: formObject.isActive
        };
        console.log("imageUrl", imageUrl)

        if (currentTestimonial) {
            const response = await fetch(`http://localhost:8000/testimonials/${currentTestimonial.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            const result = await response.json();
            setTestimonials(testimonials.map(testimonial => testimonial.id === result.id ? result : testimonial));
            toast.success('Testimonial updated successfully');
        } else {
            const response = await fetch('http://localhost:8000/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                const result = await response.json();
                setTestimonials(prevTestimonialList => [...prevTestimonialList, result]);
                toast.success('Testimonial added successfully');
            } else {
                toast.error('Failed to add testimonial info');
            }
        }

        reset();
        setImage(null);
        setBase64Image("");
        setCurrentTestimonial(null);
        refetch();

    };

    const onReset = (e) => {
        reset();
        setImage(null);
        setBase64Image("");
        setCurrentTestimonial(null);
    };

    const handleEdit = (testimonial) => {
        setCurrentTestimonial(testimonial);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/testimonials/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
                toast.success('Testimonial deleted successfully');
            } else {
                toast.error('Failed to delete testimonial');
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
        }
    };


    return (
        <>
            {/* Testimonial Form Start */}
            <section id="testimonial-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="testimonial-container">
                            <div className="col-12">
                                <h2>Add Testimonial Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="img-container text-center">
                                        <div className="image" onClick={handleImageClick}>
                                            {image ?
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt=""
                                                    className="img-display-after"
                                                />
                                                : <img
                                                    src={base64Image || "../assets/img/default-image.jpg"}
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            }
                                            <input
                                                type="file"
                                                name="file"
                                                id="file-input"
                                                {...register("file")}
                                                accept={acceptedFileTypes}
                                                multiple={false}
                                                onChange={handleImageChange}
                                                ref={imageRef}
                                                style={{ "display": "none" }}
                                            />
                                        </div>
                                        <label className="my-3"><b>Choose Client Image</b></label>
                                    </div>
                                    {errors.file && <p className="error-message">{errors.file.message}</p>}
                                    <input
                                        type="text"
                                        name="name"
                                        {...register("name")}
                                        placeholder="Client Name"
                                        required
                                    />
                                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                                    <textarea
                                        name="desc"
                                        {...register("desc")}
                                        placeholder="Description"
                                        required
                                    ></textarea>
                                    {errors.desc && <p className="error-message">{errors.desc.message}</p>}
                                    <div className="isActive">
                                        <input
                                            type="checkbox"
                                            id="active"
                                            {...register("isActive")}
                                            name="isActive"
                                            className="mx-2"
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
            {/* Testimonial Form End */}
            <Testimonial onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
}

export default AddTestimonialForm;
