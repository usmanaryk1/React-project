import { useEffect } from "react";
import About from "./About";
import Certification from "./Certification";
import Portfolio from "./Portfolio";
import Services from "./Services";


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
                <About />
                <Certification />
                <Portfolio />
                <Services />
            </section>
        </>
    );
}

export default Form;