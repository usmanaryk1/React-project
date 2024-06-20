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
    const [services, setServices] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [certification, setCertification] = useState([]);

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const addService = (service) => {
        setServices([...services, service]);
    };

    const addPortfolio = (portfolios) => {
        setPortfolio([...portfolio, portfolios]);
    };

    const addCertificate = (certificate) => {
        setCertification([...certification, certificate]);
    };

    return (
        <>
            <section id="form">
                {currentStep === 0 && <About nextStep={nextStep} />}
                {currentStep === 1 && <Services nextStep={nextStep} prevStep={prevStep} addService={addService} />}
                {currentStep === 2 && <Portfolio nextStep={nextStep} prevStep={prevStep} addPortfolio={addPortfolio} />}
                {currentStep === 3 && <Certification nextStep={nextStep} prevStep={prevStep} addCertificate={addCertificate} />}
                {/* <About />
                <Services />
                <Portfolio />
                <Certification /> */}
            </section>
        </>
    );
}

export default Form;