import Counter from "../../Components/Counter";

const AddCounterForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formObject = Object.fromEntries(formData);

        console.log('Service Data:', formObject);

        const updatedData = {
            counterEnd: formObject.counts,
            text: formObject.title,
            id: "1"
        };

        fetch('http://localhost:8000/counts/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                alert("Submitted Successfully")

                e.target.reset();  // Reset the form after successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        e.target.reset();
    };

    const onReset = (e) => {
        e.preventDefault();
        e.target.form.reset();
    };


    return (
        <>
            {/* Counter Form Start */}
            <section id="counter-form" className="form">
                <div className="container">
                    <div className="row">
                        <div className="counter-container">
                            <div className="col-12">
                                <h2>Add Counter Info!</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={onSubmit}>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        placeholder="Title in Uppercase" 
                                        required 
                                    />
                                    <input 
                                        type="number" 
                                        name="counts" 
                                        placeholder="Number of Counts"
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
            {/* Counter Form End */}
            <Counter />
        </>
    );
}
 
export default AddCounterForm;