import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
// import BlogDetails from "./Components/BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PortfolioDetails from "./Components/PortfolioDetails";
import CertificationDetails from "./Components/CertificationDetails";
import Form from "./CMSAdmin/Form";
// import { useState, useEffect } from "react";
import SignUp from "./CMSAdmin/Auth/SignUp/SignUp";
import Login from "./CMSAdmin/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./CMSAdmin/Auth/AuthContext";
import AddPortfolioDetails from "./CMSAdmin/Portfolio/AddPortfolioDetails";
// import { useAuth } from "./CMSAdmin/Auth/AuthContext";
// Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/

function App() {
  // const { isAuthenticated, isAdminPage } = useAuth();
  
  return (
    <Router>
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
              <Route path="/form/portfolioDetails-form/:id" component={AddPortfolioDetails} />
              <Route path="/certifications/:id">
                <CertificationDetails />
              </Route>
              <Route path="/form" render={() => (
                <Form />
              )} />
              <Route path="/form/signup-form" render={() => (
                <SignUp />
              )} />
              <Route path="/form/login-form" render={() => (
                <Login />
              )} />
            </Switch>
          </div>
          <Footer />
          <ToastContainer />
        </div >
      </AuthProvider>
    </Router>
  );
}

export default App;
