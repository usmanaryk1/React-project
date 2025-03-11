import { useMemo } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { AuthProvider } from "./CMSAdmin/Auth/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
// import BlogDetails from "./Components/BlogDetails";
import PortfolioDetails from "./Components/PortfolioDetails";
// import CertificationDetails from "./Components/CertificationDetails";
import Form from "./CMSAdmin/Form";
import SignUp from "./CMSAdmin/Auth/SignUp/SignUp";
import Login from "./CMSAdmin/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import NotFound from "./Components/404Page/404Page";
import TermsandConditions from "./Components/TermsAndConditions/Terms&Conditions";
import AddPortfolioDetails from "./CMSAdmin/PortfolioDetails/AddPortfolioDetails";
import useFetch from "./Components/useFetch";
import Loading from "./Components/Loading/Loading";

function App() {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );
  // const { data: termsList, isPending } = useFetch(`${API_URL}/api/terms`);
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route path="/blogs/:id">
              <BlogDetails />
             </Route> */}
            <Route path={`/works/:id`}>
              <PortfolioDetails />
            </Route>
            <Route
              path="/form/portfolioDetails-form/:id"
              component={AddPortfolioDetails}
            />
            {/* <Route path="/certifications/:id">
                <CertificationDetails />
              </Route> */}
            <Route path="/form" render={() => <Form />} />
            <Route path="/form/signup-form" render={() => <SignUp />} />
            <Route path="/form/login-form" render={() => <Login />} />
            <Route
              path="/termsandconditions"
              render={() => <TermsandConditions termsList={null} />}
            />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
