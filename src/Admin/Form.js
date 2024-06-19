import { useState, useEffect } from "react";
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

    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    return (
        <>
            <section id="form">
                {currentStep === 0 && <About nextStep={nextStep} />}
                {currentStep === 1 && <Services nextStep={nextStep} />}
                {currentStep === 2 && <Portfolio nextStep={nextStep} />}
                {currentStep === 3 && <Certification nextStep={nextStep} />}
                {/* <About />
                <Services />
                <Portfolio />
                <Certification /> */}
            </section>
        </>
    );
}

export default Form;