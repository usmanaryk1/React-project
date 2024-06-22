import Hero from "../../Components/Hero";

const HeroForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Form Data:', formObject);

    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };

    return (
        <>
            <section id="hero-form" className="hero-form form">

                <h2>Add Home Info!</h2>

                <form onSubmit={onSubmit}>

                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="qualities" placeholder="Qualities" />

                    <button className="reset" type="reset" onClick={onReset}>Reset</button>
                    <button className="cancel">Cancel</button>
                    <button className="submit" type="submit">Submit</button>  
                </form>
                <hr />
            </section>
            <Hero />
        </>
    );
}

export default HeroForm;