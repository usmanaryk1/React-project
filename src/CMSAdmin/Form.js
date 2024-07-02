// import { useEffect } from "react";
import AddCertificationForm from "./Certification/AddCertificationForm";
import AddForm from "./About/AddForm";
import AddServiceForm from "./Services/AddServiceForm";
import AddPortfolioForm from "./Portfolio/AddPortfolioForm";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import HeroForm from "./Home/HeroForm";
import ContactForm from "./Contact/ContactForm";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";
import ForgetPwd from "./Auth/ForgetPwd/ForgetPwd";
import ResetPwd from "./Auth/ForgetPwd/ResetPwd";
import AddTestimonialForm from "./Testimonial/AddTestimonialForm";
import AddCounterForm from "./Counter/AddCounterForm";
import AddPortfolioDetails from "./Portfolio/AddPortfolioDetails";
// import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import { useState } from "react";
import PrivateRoute from "./Auth/AuthGuard";
const Form = ({ onSignup, onLogin, isAuthenticated }) => {

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
    console.log("path", path);

    return (
        <>
            <section id="form">
                <Switch>
                    {/* <Route exact path={path}>
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
                    <Route path={`${path}/counter-form`}>
                        <AddCounterForm />
                    </Route>
                    <Route path={`${path}/portfolio-form`}>
                        <AddPortfolioForm />
                    </Route>
                    <Route path={`${path}/portfolioDetails-form`}>
                        <AddPortfolioDetails />
                    </Route>
                    <Route path={`${path}/testimonial-form`}>
                        <AddTestimonialForm />
                    </Route>
                    <Route path={`${path}/certification-form`}>
                        <AddCertificationForm />
                    </Route>
                    <Route path={`${path}/contact-form`}>
                        <ContactForm />
                    </Route> */}
                    <PrivateRoute exact path={path} component={Dashboard} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path}/hero-form`} component={HeroForm} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path}/about-form`} component={AddForm} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path}/service-form`} component={AddServiceForm} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path}/counter-form`} component={AddCounterForm} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path}/portfolio-form`} component={AddPortfolioForm} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path}/portfolioDetails-form`} component={AddPortfolioDetails} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path}/testimonial-form`} component={AddTestimonialForm} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path} /certification-form`} component={AddCertificationForm} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path={`${path}/contact-form`} component={ContactForm} isAuthenticated={isAuthenticated} />
                    <Route path="/form/signup-form">
                        <SignUp onSignup={onSignup} />
                    </Route>
                    <Route path="/form/login-form">
                        <Login onLogin={onLogin} />
                    </Route>
                    <Route path={`${path}/forget-form`}>
                        <ForgetPwd />
                    </Route>
                    <Route path={`${path}/reset-form`}>
                        <ResetPwd />
                    </Route>
                </Switch>
            </section>
        </>
    );
}

export default Form;