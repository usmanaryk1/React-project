import Portfolio from "../../Components/Portfolio";
import { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./PortfolioValidation";

const AddPortfolioForm = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            file: '',
            title: '',
            link: '',
            category: '',
            date: '',
            isActive: false
        }
    })

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
        setValue("file", e.target.files);
    };

    const handleImageClick = () => {
        imageRef.current.click();
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader(file);
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        })

    }

    const onSubmit = async (formObject, e) => {
        e.preventDefault();

        formObject.linkImage = base64Image; // Add the base64 image to the form object
        formObject.workImage = base64Image; // Add the base64 image to the form object

        let imageUrl = formObject.linkImage;
        let imageUrl2 = formObject.workImage;

        console.log('Portfolio Data:', formObject);

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
                imageUrl2 = data.url; // Assuming the server responds with the URL of the uploaded image

            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        }

        const updatedData = {
            wTitle: formObject.title,
            pURL: formObject.link,
            wCategory: formObject.category,
            wDate: formObject.date,
            linkImage: imageUrl,
            workImage: imageUrl2,
            isActive: formObject.isActive,
            id: "1"
        };

        console.log("imageUrl", imageUrl)
        console.log("imageUrl2", imageUrl2)

        // Send PUT request to update the JSON data
        try {
            const response = await fetch('http://localhost:8000/works/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();

            console.log('Success:', data);

            toast.success('Submitted Successfully');

            e.target.reset();  // Reset the form after successful submission

            setImage(null);

            setBase64Image("");   // Clear the image state 

        } catch (error) {
            console.error('Error updating the JSON data:', error);
        }

        e.target.reset();
    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };

    return (
        <>
            <section id="portfolio-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="portfolio-container">
                            <div className="col-12">
                                <h2>Add Portfolio Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="img-container text-center">
                                        <div className="image" onClick={handleImageClick}>
                                            {image ?
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt=""
                                                    className="img-display-before"
                                                />
                                                : <img
                                                    src="../assets/img/default-work-image.webp"
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            }
                                            <input
                                                type="file"
                                                name="file"
                                                {...register('file')}
                                                multiple={false}
                                                accept={acceptedFileTypes}
                                                onChange={handleImageChange}
                                                ref={imageRef}
                                                style={{ "display": "none" }}
                                                required
                                            />
                                        </div>
                                        <label className="my-3"><b>Choose Project Image</b></label>
                                        {errors.file && <p className="error-message">{errors.file.message}</p>}
                                    </div>

                                    <input
                                        type="text"
                                        name="title"
                                        {...register('title')}
                                        placeholder="Add title of Project"
                                        required
                                    />
                                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                                    <input
                                        type="text"
                                        name="link"
                                        {...register('link')}
                                        placeholder="Share Link of Project"
                                        required
                                    />
                                    {errors.link && <p className="error-message">{errors.link.message}</p>}
                                    <input
                                        type="text"
                                        name="category"
                                        {...register('category')}
                                        placeholder="Add the category of Project"
                                        required
                                    />
                                    {errors.category && <p className="error-message">{errors.category.message}</p>}
                                    <input
                                        type="date"
                                        name="date"
                                        {...register('date')}
                                        placeholder="Date of Project"
                                        required
                                    />
                                    {errors.date && <p className="error-message">{errors.date.message}</p>}
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
                                        <button className="cancel" onClick={onReset}>Cancel</button>
                                        <button className="submit" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <Portfolio title="Portfolio" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
        </>
    );
}

export default AddPortfolioForm;