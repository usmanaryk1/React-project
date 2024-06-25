import { useRef, useState } from "react";
import About from "../../Components/About";

const AddForm = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef(null);
    const [base64Image, setBase64Image] = useState("");


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBase64Image(base64);
        console.log("base64", base64);
        setImage(file);
    };

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

    const handleImageClick = () => {
        imageRef.current.click();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

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
            aboutName: formObject.name,
            aboutProfile: formObject.profile,
            aboutEmail: formObject.email,
            aboutPhone: formObject.phone,
            aboutDesc1: formObject.desc, // Assuming all desc is in one textarea
            aboutDesc2: "",
            aboutDesc3: "",
            aboutImg: imageUrl,
            id: "1"
        };
        console.log("imageUrl" , imageUrl)

        // Send PUT request to update the JSON data
        try {
            const response = await fetch('http://localhost:8000/about/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            console.log('Success:', data);
            e.target.reset();  // Reset the form after successful submission
            setImage(null); 
            setBase64Image("");   // Clear the image state 
        } catch (error) {
            console.error('Error updating the JSON data:', error);
        }

    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
        setImage(null); 
        setBase64Image("");      // Clear the image state
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
                                <form onSubmit={onSubmit}>
                                    <div className="image" onClick={handleImageClick}>
                                        {image ?
                                            <img src={URL.createObjectURL(image)} alt="" className="img-display-after" />
                                            : <img src="../assets/img/default-image.jpg" alt="default" className="img-display-before" />
                                        }
                                        <input type="file" name="file" onChange={handleImageChange} ref={imageRef} style={{ "display": "none" }} />
                                    </div>
                                    <label className="my-3"><b>Choose Profile Image</b></label>
                                    <input type="text" name="name" placeholder="Name" />
                                    <input type="text" name="profile" placeholder="Profile" />
                                    <input type="email" name="email" placeholder="Email" />
                                    <input type="text" name="phone" placeholder="Phone Number" />
                                    <textarea name="desc" id="" placeholder="Description" ></textarea>
                                    {/* <input type="text" name="skill" placeholder="Skills" /> */}

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
            <About />
        </>
    );
}

export default AddForm;