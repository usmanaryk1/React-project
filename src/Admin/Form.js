import { useEffect } from "react";
import AddCertificationForm from "./Certification/AddCertificationForm";
import AddForm from "./About/AddForm";
import AddServiceForm from "./Services/AddServiceForm";
import AddPortfolioForm from "./Portfolio/AddPortfolioForm";

const Form = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "%PUBLIC_URL%/assets/js/main.js";
        script.async = true;
        document.body.appendChild(script);
        console.log("form");
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    return (
        <>
            <section id="form">
                <AddForm />
                <AddServiceForm />
                <AddPortfolioForm />
                <AddCertificationForm />
            </section>
        </>
    );
}

export default Form;