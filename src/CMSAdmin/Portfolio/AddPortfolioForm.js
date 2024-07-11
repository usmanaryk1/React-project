import Portfolio from "../../Components/Portfolio";
import { useRef, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import validationSchema from "./PortfolioValidation";
import useFetch from "../../Components/useFetch";

const AddPortfolioForm = () => {

    const [currentPortfolio, setCurrentPortfolio] = useState(null);
    const { data: portfolios, setData: setPortfolios, refetch } = useFetch("http://localhost:8000/works");
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
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
    };

    const handleImageClick = () => {
        document.getElementById('file-input').click();
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

    useEffect(() => {
        if (currentPortfolio) {
            setValue('title', currentPortfolio.wTitle);
            setValue('link', currentPortfolio.pURL);
            setValue('category', currentPortfolio.wCategory);
            setValue('date', formatDate(currentPortfolio.wDate));
            setValue('isActive', currentPortfolio.isActive);
            setBase64Image(currentPortfolio.linkImage);
            setImage(null); // or set to a placeholder if needed
        } else {
            reset();
        }
    }, [currentPortfolio, setValue, reset]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
            
        };

        console.log("imageUrl", imageUrl)
        console.log("imageUrl2", imageUrl2)

        if (currentPortfolio) {
            const response = await fetch(`http://localhost:8000/works/${currentPortfolio.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            const result = await response.json();
            setPortfolios(portfolios.map(portfolio => portfolio.id === result.id ? result : portfolio));
            toast.success('Portfolio updated successfully');
        } else {
            const response = await fetch('http://localhost:8000/works', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                const result = await response.json();
                setPortfolios(prevPortfolioList => [...prevPortfolioList, result]);
                toast.success('Portfolio added successfully');
            } else {
                toast.error('Failed to add Portfolio info');
            }
        }

        reset();
        setImage(null);
        setBase64Image("");
        setCurrentPortfolio(null);
        refetch();
    };

    const onReset = (e) => {
        reset();
        setImage(null);
        setBase64Image("");
        setCurrentPortfolio(null);
    };

    const handleEdit = (portfolio) => {
        setCurrentPortfolio(portfolio);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/works/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPortfolios(portfolios.filter(portfolio => portfolio.id !== id));
                toast.success('Portfolio deleted successfully');
            } else {
                toast.error('Failed to delete portfolio');
            }
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
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
                                                    src={base64Image || "../assets/img/default-work-image.webp"}
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            }
                                            <input
                                                type="file"
                                                name="file"
                                                id="file-input"
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
                                        type="text"
                                        name="date"
                                        {...register('date')}
                                        placeholder="Date of Project (18 Sep, 2018)"
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
                                        <button className="submit" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <Portfolio title="Portfolio" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
}

export default AddPortfolioForm;