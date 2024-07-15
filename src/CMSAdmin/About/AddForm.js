import { useRef, useState, useEffect } from "react";
import About from "../../Components/About";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import validationSchema from "./AboutValidation";
import useFetch from "../../Components/useFetch";

const AddForm = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            file: '',
            name: '',
            profile: '',
            skills: '',
            email: '',
            phone: '',
            desc: '',
            isActive: false
        }
    })

    const [image, setImage] = useState(null);
    const imageRef = useRef(null);
    const [base64Image, setBase64Image] = useState("");
    const [currentAbout, setCurrentAbout] = useState(null);
    const { data: about, setData: setAbout, refetch } = useFetch("http://localhost:8000/about");

console.log('about:',about)
    useEffect(() => {
        if (currentAbout) {
            setValue('name', currentAbout.name);
            setValue('profile', currentAbout.profile);
            setValue('email', currentAbout.email);
            setValue('phone', currentAbout.phone);
            setValue('desc', currentAbout.desc1);
            setValue('isActive', currentAbout.isActive);
            setBase64Image(currentAbout.img);
            setImage(null); 
        } else {
            reset();
            setBase64Image("");
        }
    }, [currentAbout, setValue, reset]);

    const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/webp, image/jpeg";

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBase64Image(base64);
        console.log("base64", base64);
        setImage(file);
    };

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

    const handleImageClick = () => {
        document.getElementById('file-input').click();
    }

    const onSubmit = async (formObject) => {

        formObject.aboutImage = base64Image; // Add the base64 image to the form object

        console.log('Form Data:', formObject);

        let imageUrl = formObject.aboutImage;

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
            profile: formObject.profile,
            email: formObject.email,
            phone: formObject.phone,
            desc1: formObject.desc, // Assuming all desc is in one textarea
            desc2: "",
            desc3: "",
            img: imageUrl,
            isActive: formObject.isActive
        };
        console.log("imageUrl", imageUrl)

        if (currentAbout) {
            const response = await fetch(`http://localhost:8000/about/${currentAbout.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            const result = await response.json();
            setAbout(about.map(item => item.id === result.id ? result : item));
            console.log('About info updated successfully', about);
            toast.success('About info updated successfully');
        } else {
            const response = await fetch('http://localhost:8000/about', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                const result = await response.json();
                setAbout(prevAboutList => [...prevAboutList, result]);
                console.log('About info added successfully',about);
                toast.success('About info added successfully');
            } else {
                toast.error('Failed to add about info');
            }
        }

        reset();
        setImage(null);
        setBase64Image("");
        setCurrentAbout(null);
        refetch();

    };

    const onReset = () => {
        reset();
        setImage(null);
        setBase64Image("");
        setCurrentAbout(null);     // Clear the image state
    };

    const handleEdit = (about) => {
        setCurrentAbout(about);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8000/about/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setAbout(about.filter(item => item.id !== id));
            refetch();
            toast.success('About info deleted successfully');
            console.log('About info deleted successfully',about);
        } else {
            toast.error('Failed to delete about info');
        }
    };

    return (
        <>
            <section id="about-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="add-container">
                            <div className="col-12">
                                <h2>Add About Info!</h2>
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
                                                {...register('file')}
                                                accept={acceptedFileTypes}
                                                multiple={false}
                                                onChange={handleImageChange}
                                                ref={imageRef}
                                                style={{ "display": "none" }}
                                            />
                                        </div>
                                        <label className="my-3"><b>Choose Profile Image</b></label>
                                    </div>
                                    {errors.file && <p className="error-message">{errors.file.message}</p>}
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
                                        name="profile"
                                        {...register('profile')}
                                        placeholder="Occupation"
                                        required
                                    />
                                    {errors.profile && <p className="error-message">{errors.profile.message}</p>}
                                    <input
                                        type="email"
                                        name="email"
                                        {...register('email')}
                                        placeholder="Email"
                                        required
                                    />
                                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                                    <input
                                        type="text"
                                        name="phone"
                                        {...register('phone')}
                                        placeholder="Phone Number"
                                        required
                                    />
                                    {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                                    <textarea
                                        name="desc"
                                        {...register('desc')}
                                        placeholder="Description"
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
                                        <button className="submit" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <About onEditClick={handleEdit} onDeleteClick={handleDelete} about={about} />
        </>
    );
}

export default AddForm;