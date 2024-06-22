// import { useEffect } from "react";
import AddCertificationForm from "./Certification/AddCertificationForm";
import AddForm from "./About/AddForm";
import AddServiceForm from "./Services/AddServiceForm";
import AddPortfolioForm from "./Portfolio/AddPortfolioForm";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import HeroForm from "./Home/HeroForm";
import ContactForm from "./Contact/ContactForm";

const Form = () => {

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "%PUBLIC_URL%/assets/js/main.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //     console.log("form");
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);
    let { path } = useRouteMatch();
    console.log("path" , path);
    return (
        <>
            <section id="form">
                <Switch>
                    <Route exact path={path}>
                        <Dashboard />
                    </Route>
                    <Route path={`${path}/hero-form`}>
                        <HeroForm />
                    </Route>
                    <Route path={`${path}/about-form`}>
                        <AddForm />
                    </Route>
                    <Route path={`${path}/service-form`}>
                        <AddServiceForm />
                    </Route>
                    <Route path={`${path}/portfolio-form`}>
                        <AddPortfolioForm />
                    </Route>
                    <Route path={`${path}/certification-form`}>
                        <AddCertificationForm />
                    </Route>
                    <Route path={`${path}/contact-form`}>
                        <ContactForm />
                    </Route>
                </Switch>
            </section>
        </>
    );
}

export default Form;