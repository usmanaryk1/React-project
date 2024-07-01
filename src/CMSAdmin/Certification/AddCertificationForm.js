import Certifications from "../../Components/Certifications";
import { useRef, useState } from "react";

const AddCertificationForm = () => {
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

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

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

            alert("Successfully submitted");

            e.target.reset();  // Reset the form after successful submission

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
        e.target.form.reset();
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
                                <form onSubmit={onSubmit}>
                                    <div className="d-flex">
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
                                                name="file"
                                                accept={acceptedFileTypes}
                                                multiple={false}
                                                onChange={handleImage2Change}
                                                ref={ image2Ref }
                                                style={{ "display": "none" }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <label className="me-5 my-3"><b>Choose Project Image</b></label>
                                    <label className="ms-5 my-3"><b>Choose Your Image</b></label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Tille of Certificate"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Category of Certificate"
                                        required
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        required
                                    ></textarea>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        required
                                    />
                                    <input
                                        type="datetime"
                                        name="time"
                                        required
                                    />


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
            {/* Certification Form End */}
            <Certifications title="Certifications" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
        </>
    );
}

export default AddCertificationForm;