import Portfolio from "../../Components/Portfolio";
import { useRef, useState } from "react";

const AddPortfolioForm = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleImageClick = () => {
        imageRef.current.click();
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Portfolio Data:', formObject);

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
                                <form onSubmit={onSubmit}>
                                    <div className="image" onClick={handleImageClick}>
                                        {image ?
                                            <img src={URL.createObjectURL(image)} alt="" className="img-display-before" />
                                            : <img src="../assets/img/default-work-image.webp" alt="default" className="img-display-before" />
                                        }
                                        <input type="file" name="file" onChange={handleImageChange} ref={imageRef} style={{ "display": "none" }} />
                                    </div>
                                    <label className="my-3"><b>Choose Project Image</b></label>
                                    <input type="text" name="title" placeholder="Add title of Project" required />
                                    <input type="text" name="link" placeholder="Share Link of Project" required />
                                    <input type="text" name="category" placeholder="Add the category of Project" required />

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
            <Portfolio title="Portfolio" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
        </>
    );
}

export default AddPortfolioForm;