import Portfolio from "../../Components/Portfolio";

const AddPortfolioForm = () => {

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
            <section id="portfolio-form" className="portfolio-form form">
                <h2>Add Portfolio Info!</h2>
                <form onSubmit={onSubmit}>
                    <input type="text" name="title" placeholder="Add title of Project"/>
                    <input type="text" name="link" placeholder="Share Link of Project" />
                    <input type="text" name="category" placeholder="Add the category of Project" />
                    <input type="file" name="file-upload" />

                    <button className="reset" type="reset" onClick={onReset}>Reset</button>
                    <button className="cancel">Cancel</button>
                    <button className="submit" type="submit">Submit</button>
                </form>
                <hr />
            </section>
            <Portfolio title="Portfolio" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
        </>
    );
}

export default AddPortfolioForm;