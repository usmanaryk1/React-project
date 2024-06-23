// import { useEffect } from "react";
import AddCertificationForm from "./Certification/AddCertificationForm";
import AddForm from "./About/AddForm";
import AddServiceForm from "./Services/AddServiceForm";
import AddPortfolioForm from "./Portfolio/AddPortfolioForm";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import HeroForm from "./Home/HeroForm";
import ContactForm from "./Contact/ContactForm";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import ForgetPwd from "./ForgetPwd/ForgetPwd";
import ResetPwd from "./ForgetPwd/ResetPwd";

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
                    <Route path={`${path}/login-form`}>
                        <Login />
                    </Route>
                    <Route path={`${path}/signup-form`}>
                        <SignUp />
                    </Route>
                    <Route path={`${path}/forget-form`}>
                        <ForgetPwd />
                    </Route>
                    <Route path={`${path}/reset-form`}>
                        <ResetPwd/>
                    </Route>
                </Switch>
            </section>
        </>
    );
}

export default Form;