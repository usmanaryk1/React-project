import Certifications from "../../Components/Certifications";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./CertificationValidation";
import { toast } from 'react-toastify';

const AddCertificationForm = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            file1: '',
            file2: '',
            title: '',
            category: '',
            description: '',
            name: '',
            time: '',
            isActive: false
        }
    });

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const [base64Image1, setBase64Image1] = useState("");
    const [base64Image2, setBase64Image2] = useState("");

    const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/webp, image/jpeg";

    const handleImage1Change = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log("base64", base64);
        setBase64Image1(base64);
        setImage1(file);
        processImage(file, setImage1);

    };

    const handleImage2Change = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBase64Image2(base64);
        setImage2(file);
        processImage(file, setImage2);
    };

    const processImage = (file, setImage) => {
        const imgname = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = Math.max(img.width, img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    img,
                    (maxSize - img.width) / 2,
                    (maxSize - img.height) / 2
                );
                canvas.toBlob(
                    (blob) => {
                        const file = new File([blob], imgname, {
                            type: "image/png",
                            lastModified: Date.now(),
                        });

                        setImage(file);
                    },
                    "image/jpeg",
                    0.8
                );
            };
        };
    };

    const handleImage1Click = () => {
        image1Ref.current.click();
    }

    const handleImage2Click = () => {
        image2Ref.current.click();
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

        console.log('Certification Data:', formObject);

        formObject.image1 = base64Image1; // Add the base64 image to the form object
        formObject.image2 = base64Image2; // Add the base64 image to the form object

        let imageUrl1 = formObject.image1;
        let imageUrl2 = formObject.image2;

        console.log('Portfolio Data:', formObject);

        if (image1) {
            const imageFormData1 = new FormData();
            imageFormData1.append('file', image1);

            try {
                const response = await fetch('http://localhost:8000/upload', {
                    method: 'POST',
                    body: imageFormData1
                });

                const data = await response.json();

                imageUrl1 = data.url; // Assuming the server responds with the URL of the uploaded image

            } catch (error) {
                console.error('Error uploading the image1:', error);
            }
        }

        if (image2) {
            const imageFormData2 = new FormData();
            imageFormData2.append('file', image2);

            try {
                const response = await fetch('http://localhost:8000/upload', {
                    method: 'POST',
                    body: imageFormData2
                });

                const data = await response.json();

                imageUrl2 = data.url; // Assuming the server responds with the URL of the uploaded image

            } catch (error) {
                console.error('Error uploading the image2:', error);
            }
        }


        const updatedData = {
            cardTitle: formObject.title,
            cardCategory: formObject.category,
            cardDescription: formObject.description,
            postDate: formObject.time,
            authorName: formObject.name,
            image: imageUrl1,
            authorImage: imageUrl2,
            id: "1"
        };

        console.log("imageUrl1", imageUrl1)
        console.log("imageUrl2", imageUrl2)

        // Send PUT request to update the JSON data
        try {
            const response = await fetch('http://localhost:8000/certifications/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();

            console.log('Success:', data);

            toast.success("Successfully submitted");

            reset();  // Reset the form after successful submission

            setImage1(null);
            setImage2(null);
            setBase64Image1("");
            setBase64Image2("");  // Clear the image state 

        } catch (error) {
            console.error('Error updating the JSON data:', error);
        }

        e.target.reset();

    };

    const onReset = (e) => {
        e.preventDefault();
        reset();
        setImage1(null);
        setImage2(null);
        setBase64Image1("");
        setBase64Image2("");
    };


    return (
        <>
            {/* Certification Form Start */}
            <section id="certification-form" className="certification-form form">
                <div className="container">
                    <div className="row">
                        <div className="certification-container">
                            <div className="col-12">
                                <h2>Add Certifications Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="img-container d-flex">
                                        <div className="image mx-auto" onClick={handleImage1Click}>
                                            {image1 ?
                                                <img
                                                    src={URL.createObjectURL(image1)}
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
                                                name="file1"
                                                {...register("file1")}
                                                accept={acceptedFileTypes}
                                                multiple={false}
                                                onChange={handleImage1Change}
                                                ref={image1Ref}
                                                style={{ "display": "none" }}
                                                required
                                            />
                                            {errors.file1 && <p className="error-message">{errors.file1.message}</p>}
                                        </div>
                                        <div className="image mx-auto" onClick={handleImage2Click}>
                                            {image2 ?
                                                <img
                                                    src={URL.createObjectURL(image2)}
                                                    alt=""
                                                    className="profile"
                                                />
                                                : <img
                                                    src="../assets/img/default-image.jpg"
                                                    alt="default"
                                                    className="profile"
                                                />
                                            }
                                            <input
                                                type="file"
                                                name="file2"
                                                {...register("file2")}
                                                accept={acceptedFileTypes}
                                                multiple={false}
                                                onChange={handleImage2Change}
                                                ref={image2Ref}
                                                style={{ "display": "none" }}
                                                required
                                            />
                                            {errors.file2 && <p className="error-message">{errors.file2.message}</p>}
                                        </div>
                                    </div>
                                    <div className="label-container d-flex">
                                        <label className="mx-auto my-3"><b>Choose Project Image</b></label>
                                        <label className="mx-auto my-3"><b>Choose Your Image</b></label>
                                    </div>

                                    <input
                                        type="text"
                                        name="title"
                                        {...register("title")}
                                        placeholder="Tille of Certificate"
                                        required
                                    />
                                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                                    <input
                                        type="text"
                                        name="category"
                                        {...register("category")}
                                        placeholder="Category of Certificate"
                                        required
                                    />
                                    {errors.category && <p className="error-message">{errors.category.message}</p>}
                                    <textarea
                                        name="description"
                                        {...register("description")}
                                        placeholder="Description"
                                        required
                                    ></textarea>
                                    {errors.description && <p className="error-message">{errors.description.message}</p>}
                                    <input
                                        type="text"
                                        name="name"
                                        {...register("name")}
                                        placeholder="Your Name"
                                        required
                                    />
                                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                                    <input
                                        type="datetime"
                                        name="time"
                                        placeholder="Time"
                                        {...register("time")}
                                        required
                                    />
                                    {errors.time && <p className="error-message">{errors.time.message}</p>}
                                    <div className="isActive">
                                        <input
                                            type="checkbox"
                                            id="active"
                                            name="isActive"
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
            {/* Certification Form End */}
            <Certifications title="Certifications" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
        </>
    );
}

export default AddCertificationForm;