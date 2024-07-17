import { useRef } from "react";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./PortfolioDetailsValidation";
import PortfolioDetails from "../../Components/PortfolioDetails";
import useFetch from "../../Components/useFetch";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const AddPortfolioDetails = () => {

    const location= useLocation();
    const childRef = useRef();
    const [currentDetails, setCurrentDetails] = useState(null);
    const { data: details, setData: setDetails } = useFetch("http://localhost:8000/workDetails");
    const { data: works, setData: setWorks } = useFetch("http://localhost:8000/workDetails");
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

    // const [image1, setImage1] = useState(null);
    // const [image2, setImage2] = useState(null);
    // const [image3, setImage3] = useState(null);
    // const imageRef1 = useRef(null);
    // const imageRef2 = useRef(null);
    // const imageRef3 = useRef(null);
    // const [base64Image1, setBase64Image1] = useState("");
    // const [base64Image2, setBase64Image2] = useState("");
    // const [base64Image3, setBase64Image3] = useState("");

    const [images, setImages] = useState([null, null, null]);
    const [base64Images, setBase64Images] = useState(["", "", ""]);
    const imageRefs = [useRef(null), useRef(null), useRef(null)];

    const handleImageClick = (index) => {
        document.getElementById(`file-input${index + 1}`).click();
    }

    const handleImageChange = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertBase64(file);
            setBase64Images(prevState => {
                const newImages = [...prevState];
                newImages[index] = base64;
                return newImages;
            });
            setImages(prevState => {
                const newImages = [...prevState];
                newImages[index] = file;
                return newImages;
            });
        }
    };

    // const handleImage1Click = () => {
    //     document.getElementById('file-input1').click();
    // }
    // const handleImage2Click = () => {
    //     document.getElementById('file-input2').click();
    // }
    // const handleImage3Click = () => {
    //     document.getElementById('file-input3').click();
    // }

    // const handleImage1Change = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const base64 = await convertBase64(file);
    //         setBase64Image1(base64);
    //         setImage1(file);
    //     }
    // };

    // const handleImage2Change = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const base64 = await convertBase64(file);
    //         setBase64Image2(base64);
    //         setImage2(file);
    //     }
    // };
    // const handleImage3Change = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const base64 = await convertBase64(file);
    //         setBase64Image3(base64);
    //         setImage3(file);
    //     }
    // };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        if (currentDetails) {
            console.log('Current Details', currentDetails);
            setValue('client', currentDetails.pClient);
            setValue('category', currentDetails.pCategory);
            setValue('date', currentDetails.pDate);
            setValue('link', currentDetails.pURL);
            setValue('desc', currentDetails.desc);
            setValue('isActive', currentDetails.isActive);
            setBase64Images([
                currentDetails.slideImage1,
                currentDetails.slideImage2,
                currentDetails.slideImage3
            ]);
            setImages([null, null, null]);
            // setBase64Image1(currentDetails.slideImage1);
            // setBase64Image2(currentDetails.slideImage2)
            // setBase64Image3(currentDetails.slideImage3)
            // setImage1(null);
            // setImage2(null);
            // setImage3(null);
            // setImages({ file1: null, file2: null, file3: null }); // or set to a placeholder if needed
        } else {
            reset();
            setBase64Images(["", "", ""]);
            // setBase64Image1("");
            // setBase64Image2("");
            // setBase64Image3("");
        }
    }, [currentDetails, setValue, reset]);

    console.log('currentDetails', currentDetails);

    const onSubmit = async (formObject) => {
        // e.preventDefault();

        formObject.slideImage1 = base64Images[0];
        formObject.slideImage2 = base64Images[1];
        formObject.slideImage3 = base64Images[2];

        // formObject.slideImage1 = base64Image1; // Add the base64 image to the form object
        // formObject.slideImage2 = base64Image2; // Add the base64 image to the form object
        // formObject.slideImage3 = base64Image3; // Add the base64 image to the form object

        let imageUrls = [...base64Images];

        for (let i = 0; i < images.length; i++) {
            if (images[i]) {
                const imageFormData = new FormData();
                imageFormData.append('file', images[i]);

                try {
                    const response = await fetch('http://localhost:8000/upload', {
                        method: 'POST',
                        body: imageFormData
                    });
                    const data = await response.json();
                    imageUrls[i] = data.url;
                } catch (error) {
                    console.error('Error uploading the image:', error);
                }
            }
        }

        // console.log('Form Data:', formObject);

        // let imageUrl1 = formObject.slideImage1;
        // let imageUrl2 = formObject.slideImage2;
        // let imageUrl3 = formObject.slideImage3;

        // // If a new image is selected, upload it
        // if (image1) {
        //     const imageFormData = new FormData();
        //     imageFormData.append('file', image1);

        //     try {
        //         const response = await fetch('http://localhost:8000/upload', {
        //             method: 'POST',
        //             body: imageFormData
        //         });
        //         const data = await response.json();
        //         console.log('data image1', data)
        //         imageUrl1 = data.url; // Assuming the server responds with the URL of the uploaded image
        //     } catch (error) {
        //         console.error('Error uploading the image:', error);
        //     }
        // }

        // if (image2) {
        //     const imageFormData = new FormData();
        //     imageFormData.append('file', image2);

        //     try {
        //         const response = await fetch('http://localhost:8000/upload', {
        //             method: 'POST',
        //             body: imageFormData
        //         });
        //         const data = await response.json();
        //         console.log('data image2', data)
        //         imageUrl2 = data.url; // Assuming the server responds with the URL of the uploaded image
        //     } catch (error) {
        //         console.error('Error uploading the image:', error);
        //     }
        // }

        // if (image3) {
        //     const imageFormData = new FormData();
        //     imageFormData.append('file', image3);

        //     try {
        //         const response = await fetch('http://localhost:8000/upload', {
        //             method: 'POST',
        //             body: imageFormData
        //         });
        //         const data = await response.json();
        //         console.log('data image3', data)
        //         imageUrl3 = data.url; // Assuming the server responds with the URL of the uploaded image
        //     } catch (error) {
        //         console.error('Error uploading the image:', error);
        //     }
        // }


        const updatedData = {
            pCategory: formObject.category,
            pClient: formObject.client,
            pDate: formObject.date,
            pURL: formObject.link,
            desc: formObject.desc,
            slideImage1: imageUrls[0],
            slideImage2: imageUrls[1],
            slideImage3: imageUrls[2],
            // slideImage1: imageUrl1,
            // slideImage2: imageUrl2,
            // slideImage3: imageUrl3,
            isActive: formObject.isActive
        };

        console.log('updatedData', updatedData)
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
            console.log('update details response:', result);
            setDetails(details.map(detail => detail.id === result.id ? result : detail));
            childRef.current.childFunction();
            console.log('Updated Details: ', details);
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
                console.log("Added Details response:", result);
                console.log("Added Details response:", result.id);
                // Update the work card with the new workDetailsId
                const workId = location.state ? location.state.workId : null;

                if (workId) {
                const workResponse = await fetch(`http://localhost:8000/works/${workId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ workDetailsId: result.id })
                });
                const workResult = await workResponse.json();
                setWorks(works.map(work => work.id === workResult.id ? workResult : work));
                }
                setDetails(prevDetails => [...prevDetails, result]);
                childRef.current.childFunction();
                console.log("Added Details:", details);
                toast.success('Details added successfully');
            } else {
                toast.error('Failed to add Details');
            }
        }

        reset();
        setCurrentDetails(null);
        setBase64Images(['', '', '']);
        setImages([null, null, null]);
    };

    const onReset = () => {
        reset();
        setCurrentDetails(null);
        setBase64Images(['', '', '']);
        setImages([null, null, null]);
    };

    const handleEdit = (details) => {
        setCurrentDetails(details);
        console.log('onEditClick: ', details);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/workDetails/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDetails(details.filter(detail => detail.id !== id));
                childRef.current.childFunction();
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
                                        {base64Images.map((base64Image, index) => (
                                            <div className="image" key={index} onClick={() => handleImageClick(index)}>
                                                {/* Image or default placeholder */}
                                                {base64Image ? (
                                                    <img
                                                        src={base64Image}
                                                        alt="Uploaded"
                                                        className="img-display-before"
                                                    />
                                                ) : (
                                                    <img
                                                        src="../../assets/img/default-work-image.webp"
                                                        alt="default"
                                                        className="img-display-before"
                                                    />
                                                )}
                                                {/* File input */}
                                                <input
                                                    type="file"
                                                    name={`file${index + 1}`}
                                                    id={`file-input${index + 1}`}
                                                    {...register(`file${index + 1}`)}
                                                    multiple={false}
                                                    onChange={(e) => handleImageChange(e, index)}
                                                    ref={imageRefs[index]}
                                                    style={{ "display": "none" }}
                                                />
                                                {/* Label */}
                                                <div className="label-container text-center">
                                                    <label className="my-3"><b>Choose Slide{index + 1} Image</b></label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* <div className="text-center">
                                        <div className="image" onClick={handleImage1Click}>
                                            {base64Image1 ? (
                                                <img
                                                    src={base64Image1}
                                                    alt="Uploaded"
                                                    className="img-display-before"
                                                />
                                            ) : (
                                                <img
                                                    src="../../assets/img/default-work-image.webp"
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                name="file1"
                                                id="file-input1"
                                                {...register('file1')}
                                                multiple={false}
                                                onChange={handleImage1Change}
                                                ref={imageRef1}
                                                style={{ "display": "none" }}
                                            />
                                            <div className="label-container text-center">
                                                <label className=" my-3"><b>Choose Slide1 Image</b></label>
                                            </div>
                                        </div>
                                        <div className="image" onClick={handleImage2Click}>
                                            {base64Image2 ? (
                                                <img
                                                    src={base64Image2}
                                                    alt="Uploaded"
                                                    className="img-display-before"
                                                />
                                            ) : (
                                                <img
                                                    src="../../assets/img/default-work-image.webp"
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                name="file2"
                                                id="file-input2"
                                                {...register('file2')}
                                                multiple={false}
                                                onChange={handleImage2Change}
                                                ref={imageRef2}
                                                style={{ "display": "none" }}
                                            />
                                            <div className="label-container text-center">
                                                <label className=" my-3"><b>Choose Slide2 Image</b></label>
                                            </div>
                                        </div>
                                        <div className="image" onClick={handleImage3Click}>
                                            {base64Image3 ? (
                                                <img
                                                    src={base64Image3}
                                                    alt="Uploaded"
                                                    className="img-display-before"
                                                />
                                            ) : (
                                                <img
                                                    src="../../assets/img/default-work-image.webp"
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                name="file3"
                                                id="file-input3"
                                                {...register('file3')}
                                                multiple={false}
                                                onChange={handleImage3Change}
                                                ref={imageRef3}
                                                style={{ "display": "none" }}
                                            />
                                            <div className="label-container text-center">
                                                <label className=" my-3"><b>Choose Slide3 Image</b></label>
                                            </div>
                                        </div>
                                    </div> */}

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
                </div >
                <hr />
            </section >
            {/* PortfolioDetails Form End */}
            {/* <Portfolio /> */}
            <PortfolioDetails onEditClick={handleEdit} onDeleteClick={handleDelete} ref={childRef} />
        </>
    );
}

export default AddPortfolioDetails;