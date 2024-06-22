import About from "../../Components/About";

const AddForm = () => {

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
            <section id="about-form" className="about-form form">

                <h2>Add About Info!</h2>

                <form onSubmit={onSubmit}>

                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="profile" placeholder="Profile" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="text" name="phone" placeholder="Phone Number" />
                    <textarea name="desc" id=""  placeholder="Description" ></textarea>
                    {/* <input type="text" name="skill" placeholder="Skills" /> */}
                    <input type="file" name="file" placeholder="Upload Profile Picture"/>

                    <button className="reset" type="reset" onClick={onReset}>Reset</button>
                    <button className="cancel">Cancel</button>
                    <button className="submit" type="submit">Submit</button>  
                </form>
                <hr />
            </section>
            <About />
        </>
    );
}

export default AddForm;