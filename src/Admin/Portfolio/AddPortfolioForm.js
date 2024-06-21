import { useState } from "react";
import PortfolioDetails from "./PortfolioDetails";

const AddPortfolioForm = () => {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const details = {title, link, category, file};

    const onSubmit = (e) => {
        e.preventDefault();
        onReset(e);
    };

    const onReset = (e) => {
        e.preventDefault();
        setTitle('');
        setLink('');
        setCategory('');
        setFile(null);
    };

    return (
        <>
            <section id="portfolio-form" className="portfolio-form form">
                <h2>Portfolio Info!</h2>
                <form>
                    <label>Add title of Project</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Share Link of Project</label>
                    <input
                        type="text"
                        required
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <label>Add the category of Project</label>
                    <input
                        type="text"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <label>Upload Your Project Image:</label>
                    <input
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <button className="reset" onClick={onReset}>Reset</button>
                    <button className="cancel">Cancel</button>
                    <button className="submit" onClick={onSubmit}>Submit</button>
                    {/* {isPending && <button disabled>...</button>}  */}
                </form>
                <PortfolioDetails details={details}/>
            </section>
        </>
    );
}

export default AddPortfolioForm;