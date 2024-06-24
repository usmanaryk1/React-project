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
            <section id="portfolio-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Add Portfolio Info!</h2>
                        </div>
                        <div className="col-12">
                            <form onSubmit={onSubmit}>
                                <input type="text" name="title" placeholder="Add title of Project" required />
                                <input type="text" name="link" placeholder="Share Link of Project" required />
                                <input type="text" name="category" placeholder="Add the category of Project" required />
                                <input type="file" name="file-upload" required />

                                <button className="reset" type="reset" onClick={onReset}>Reset</button>
                                <button className="cancel">Cancel</button>
                                <button className="submit" type="submit">Submit</button>
                            </form>
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