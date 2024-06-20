import { useState } from "react";

const Portfolio = ({ nextStep, prevStep, addPortfolio }) => {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');
    const [portfolio, setPortfolio] = useState([]);

    const handleAddPortfolio = (e) => {
        e.preventDefault();
        const newPortfolio = { title, link, category };
        setPortfolio([...portfolio, newPortfolio]);
        setTitle('');
        setLink('');
        setCategory('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPortfolio(portfolio);
        nextStep();
    };

    return (
        <>
            <section id="portfolio-form" class="portfolio-form form">
                <h2>Portfolio Info!</h2>
                <a className="add" onClick={handleAddPortfolio} href="/" > <span className="bi bi-plus-circle" /></a><br />

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
                    <label for="file-upload">Upload Your Project Image:</label>
                    <input
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        accept="image/*"
                        required
                    />
                    <button className="prev" onClick={prevStep}>Previous</button>
                    <button className="next" onClick={handleSubmit}>Next</button>
                    {/* {isPending && <button disabled>...</button>}  */}
                </form>
                <h5>Here, you can see the all the details you add</h5>
                <ul>
                    {portfolio.map((portfolios, index) => (
                        <li key={index}>
                            {portfolios.title} - {portfolios.link} - {portfolios.category}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Portfolio;