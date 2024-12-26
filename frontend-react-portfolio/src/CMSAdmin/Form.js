import AddCertificationForm from "./Certification/AddCertificationForm";
import AddForm from "./About/AddForm";
import AddServiceForm from "./Services/AddServiceForm";
import AddPortfolioForm from "./Portfolio/AddPortfolioForm";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import HeroForm from "./Home/HeroForm";
import ContactForm from "./Contact/ContactForm";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";
import ForgetPwd from "./Auth/ForgetPwd/ForgetPwd";
// import ResetPwd from "./Auth/ResetPwd/ResetPwd";
import AddTestimonialForm from "./Testimonial/AddTestimonialForm";
import AddCounterForm from "./Counter/AddCounterForm";
import PrivateRoute from "./Auth/AuthGuard";
import { useAuth } from "./Auth/AuthContext";
import SocialForm from "./Socials/SocialForm";
import CVUploader from "./UploadCV/CVUploaderForm";
import TermsAndConditionsEdit from "./TermsAndConditionsEdit/TermsAndConditionsEdit";
import AddPortfolioDetails from "./PortfolioDetails/AddPortfolioDetails";
import SkillsEdit from "./Skills/SkillsEdit";
import ManageSectionsVisibility from "./ManageSectionsVisibility/ManageSectionsVisibility";

const Form = () => {
  const { isAuthenticated } = useAuth();

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
          {/* Public Routes */}
          <Route path="/form/signup-form">
            <SignUp />
          </Route>
          <Route path="/form/login-form">
            <Login />
          </Route>
          <Route path={`/form/forget-form`}>
            <ForgetPwd />
          </Route>
          {/* <Route path={`/form/reset-form`}>
            <ResetPwd />
          </Route> */}
          <PrivateRoute
            exact
            path={`/form/dashboard`}
            component={Dashboard}
            isAuthenticated={isAuthenticated}
            title="FORMS"
            subtitle="Navigate to any form"
          />
          <PrivateRoute
            path={`/form/manage-sections`}
            component={ManageSectionsVisibility}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/hero-form`}
            component={HeroForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/about-form`}
            component={AddForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/skills-form`}
            component={SkillsEdit}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/service-form`}
            component={AddServiceForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/counter-form`}
            component={AddCounterForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/portfolio-form`}
            component={AddPortfolioForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/portfolioDetails-form`}
            component={AddPortfolioDetails}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/testimonial-form`}
            component={AddTestimonialForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/certification-form`}
            component={AddCertificationForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/contact-form`}
            component={ContactForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/social-form`}
            component={SocialForm}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/CV-form`}
            component={CVUploader}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={`/form/termsandconditions`}
            component={TermsAndConditionsEdit}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </section>
    </>
  );
};

export default Form;
