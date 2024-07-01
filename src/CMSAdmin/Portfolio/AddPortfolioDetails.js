import { useRef, useState } from "react";

const AddPortfolioDetails = () => {

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);
    const [base64Image1, setBase64Image1] = useState("");
    const [base64Image2, setBase64Image2] = useState("");
    const [base64Image3, setBase64Image3] = useState("");

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

    const handleImage3Change = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBase64Image3(base64);
        setImage3(file);
        processImage(file, setImage3);
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

    const handleImage3Click = () => {
        image3Ref.current.click();
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

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Certification Data:', formObject);

        formObject.image1 = base64Image1; // Add the base64 image to the form object
        formObject.image2 = base64Image2; // Add the base64 image to the form object
        formObject.image3 = base64Image3; // Add the base64 image to the form object

        let imageUrl1 = formObject.image1;
        let imageUrl2 = formObject.image2;
        let imageUrl3 = formObject.image3;

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

        if (image3) {
            const imageFormData3 = new FormData();
            imageFormData3.append('file', image3);

            try {
                const response = await fetch('http://localhost:8000/upload', {
                    method: 'POST',
                    body: imageFormData3
                });

                const data = await response.json();

                imageUrl3 = data.url; // Assuming the server responds with the URL of the uploaded image

            } catch (error) {
                console.error('Error uploading the image2:', error);
            }
        }

        const updatedData = {
            pCategory: formObject.category,
            pClient: formObject.name,
            pDate: formObject.date,
            pURL: formObject.link,
            desc: formObject.desc,
            slideImage1: imageUrl1,
            slideImage2: imageUrl2,
            slideImage3: imageUrl3,
            id: "1"
        };

        console.log("imageUrl1", imageUrl1)
        console.log("imageUrl2", imageUrl2)
        console.log("imageUrl3", imageUrl3)

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

            alert("Successfully submitted");

            e.target.reset();  // Reset the form after successful submission

            setImage1(null);
            setImage2(null);
            setImage3(null);
            setBase64Image1("");
            setBase64Image2("");  // Clear the image state 
            setBase64Image3("");  // Clear the image state 

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
            {/* PortfolioDetails Form Start */}
            <section id="portfolioDetails-form" className="certification-form form">
                <div className="container">
                    <div className="row">
                        <div className="portfolioDetails-container">
                            <div className="col-12">
                                <h2>Add Portfolio Details Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>
                                    <div className="d-flex flex-wrap">
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
                                                name="file"
                                                accept={acceptedFileTypes}
                                                multiple={false}
                                                onChange={handleImage1Change}
                                                ref={image1Ref}
                                                style={{ "display": "none" }}
                                                required
                                            />
                                        </div>
                                        <div className="image mx-auto" onClick={handleImage2Click}>
                                            {image2 ?
                                                <img
                                                    src={URL.createObjectURL(image2)}
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
                                                accept={acceptedFileTypes}
                                                multiple={false}
                                                onChange={handleImage2Change}
                                                ref={image2Ref}
                                                style={{ "display": "none" }}
                                                required
                                            />
                                        </div>


                                        <div className="image mx-auto" onClick={handleImage3Click}>
                                            {image3 ?
                                                <img
                                                    src={URL.createObjectURL(image3)}
                                                    alt=""
                                                    className="img-display-before mt-4"
                                                />
                                                : <img
                                                    src="../assets/img/default-work-image.webp"
                                                    alt="default"
                                                    className="img-display-before mt-4"
                                                />
                                            }
                                            <input
                                                type="file"
                                                name="file"
                                                accept={acceptedFileTypes}
                                                multiple={false}
                                                onChange={handleImage3Change}
                                                ref={image3Ref}
                                                style={{ "display": "none" }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <label className="mx-auto my-3"><b>Choose Project Images</b></label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Client Company"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Category of Project"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="name"
                                        placeholder="Date"
                                        required
                                    />
                                    <input 
                                        type="text" 
                                        name="link" 
                                        placeholder="Enter link to your project" 
                                        required 
                                    />
                                    <textarea 
                                        name="desc" 
                                        placeholder="Description" 
                                        required
                                    ></textarea>
                                    <button className="reset" type="reset" onClick={onReset}>Reset</button>
                                    <button className="cancel">Cancel</button>
                                    <button className="submit" type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            {/* PortfolioDetails Form End */}
        </>
    );
}

export default AddPortfolioDetails;