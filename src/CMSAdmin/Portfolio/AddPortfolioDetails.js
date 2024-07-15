import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./PortfolioDetailsValidation";
import PortfolioDetails from "../../Components/PortfolioDetails";
import useFetch from "../../Components/useFetch";

const AddPortfolioDetails = () => {

    const [currentDetails, setCurrentDetails] = useState(null);
    const { data: details, setData: setDetails } = useFetch("http://localhost:8000/workDetails");
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            file1: '',
            file2: '',
            file3: '',
            client: '',
            category: '',
            date: '',
            link: '',
            desc: '',
            isActive: false
        }
    })


    const [images, setImages] = useState({ file1: null, file2: null, file3: null });
    const [base64Images, setBase64Images] = useState({ file1: "", file2: "", file3: "" });

    const handleImageChange = async (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            const file = files[0];
            const base64 = await convertBase64(file);
            setBase64Images(prev => ({ ...prev, [name]: base64 }));
            setImages(prev => ({ ...prev, [name]: file }));
        }
    };

    // const handleImage2Change = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
    //     setBase64Image2(base64);
    //     setImage2(file);
    // };

    // const handleImage3Change = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
    //     setBase64Image3(base64);
    //     setImage3(file);
    // };

    // const handleImage1Click = () => {
    //     document.getElementById('file-input1').click();
    // }

    // const handleImage2Click = () => {
    //     document.getElementById('file-input2').click();
    // }

    // const handleImage3Click = () => {
    //     document.getElementById('file-input3').click();
    // }

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

    useEffect(() => {
        if (currentDetails) {
            setValue('client', currentDetails.pClient);
            setValue('category', currentDetails.pCategory);
            setValue('date', currentDetails.pDate);
            setValue('link', currentDetails.pURL);
            setValue('desc', currentDetails.desc);
            setValue('isActive', currentDetails.isActive);
            setBase64Images({
                file1: currentDetails.slideImage1,
                file2: currentDetails.slideImage2,
                file3: currentDetails.slideImage3
            });
            setImages({ file1: null, file2: null, file3: null }); // or set to a placeholder if needed
        } else {
            reset();
        }
    }, [currentDetails, setValue, reset]);

    const uploadImage = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
    
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                throw new Error('Failed to upload image');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };
    
    const onSubmit = async (formObject) => {
        // e.preventDefault();

        const uploadedImageUrls = await Promise.all(
            Object.values(images).map(file => file ? uploadImage(file) : Promise.resolve(''))
        );

        const updatedData = {
            pCategory: formObject.category,
            pClient: formObject.client,
            pDate: formObject.date,
            pURL: formObject.link,
            desc: formObject.desc,
            slideImage1: uploadedImageUrls[0],
            slideImage2: uploadedImageUrls[1],
            slideImage3: uploadedImageUrls[2],
            isActive: formObject.isActive
        };



        // Send PUT request to update the JSON data
        if (currentDetails) {
            const response = await fetch(`http://localhost:8000/workDetails/${currentDetails.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            const result = await response.json();
            console.log("updatedDetails:", result);
            setDetails(details.map(detail => detail.id === result.id ? result : detail));
            toast.success('Details updated successfully');
        } else {
            const response = await fetch('http://localhost:8000/workDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Added Details:", result);
                setDetails(prevDetails => [...prevDetails, result]);
                toast.success('Details added successfully');
            } else {
                toast.error('Failed to add Details');
            }
        }

        reset();
        setCurrentDetails(null);
        setImages({ file1: null, file2: null, file3: null });
        setBase64Images({ file1: "", file2: "", file3: "" }); // Clear the image state 
    };

    const onReset = () => {
        reset();
        setCurrentDetails(null);
        setImages({ file1: null, file2: null, file3: null });
        setBase64Images({ file1: "", file2: "", file3: "" });
    };

    const handleEdit = (details) => {
        setCurrentDetails(details);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/workDetails/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDetails(details.filter(detail => detail.id !== id));
                toast.success('Details deleted successfully');
            } else {
                toast.error('Failed to delete details');
            }
        } catch (error) {
            console.log('Error deleting details:', error);
        }
    };

    return (
        <>
            {/* PortfolioDetails Form Start */}
            <section id="portfolioDetails-form" className="portfolioDetails-form form">
                <div className="container">
                    <div className="row">
                        <div className="portfolioDetails-container">
                            <div className="col-12">
                                <h2>Add Portfolio Details Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="text-center">
                                        {[1, 2, 3].map(index => (
                                            <>
                                                <div key={index} className="image mx-auto" onClick={() => document.getElementById(`file-input${index}`).click()}>
                                                    <img
                                                        src={images[`file${index}`] ? URL.createObjectURL(images[`file${index}`]) : base64Images[`file${index}`] || "../../assets/img/default-work-image.webp"}
                                                        alt={`Project ${index}`}
                                                        className="img-display-before"
                                                    />
                                                    <input
                                                        type="file"
                                                        name={`file${index}`}
                                                        id={`file-input${index}`}
                                                        {...register(`file${index}`)}
                                                        multiple={false}
                                                        onChange={handleImageChange}
                                                        style={{ display: "none" }}
                                                        required
                                                    />
                                                </div>
                                                <div className="label-container text-center">
                                                    <label className=" my-3"><b>{`Choose Slide${index} Image`}</b></label>
                                                </div>
                                            </>
                                        ))}
                                    </div>

                                    {errors.file1 && <p className="error-message">{errors.file1.message}</p>}
                                    {errors.file2 && <p className="error-message">{errors.file2.message}</p>}
                                    {errors.file3 && <p className="error-message">{errors.file3.message}</p>}
                                    <input
                                        type="text"
                                        name="client"
                                        {...register('client')}
                                        placeholder="Client Company"
                                        required
                                    />
                                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                                    <input
                                        type="text"
                                        name="category"
                                        {...register('category')}
                                        placeholder="Category of Project"
                                        required
                                    />
                                    {errors.category && <p className="error-message">{errors.category.message}</p>}
                                    <input
                                        type="text"
                                        name="date"
                                        {...register('date')}
                                        placeholder="Date (YY-MM-DD)"
                                        required
                                    />
                                    {errors.date && <p className="error-message">{errors.date.message}</p>}
                                    <input
                                        type="text"
                                        name="link"
                                        {...register('link')}
                                        placeholder="Enter link to your project"
                                        required
                                    />
                                    {errors.link && <p className="error-message">{errors.link.message}</p>}
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
            {/* PortfolioDetails Form End */}
            {/* <Portfolio /> */}
            <PortfolioDetails onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
}

export default AddPortfolioDetails;