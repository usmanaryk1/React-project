import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
// import BlogDetails from "./Components/BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PortfolioDetails from "./Components/PortfolioDetails";
import CertificationDetails from "./Components/CertificationDetails";
import Form from "./CMSAdmin/Form";
import { useState, useEffect } from "react";
import SignUp from "./CMSAdmin/Auth/SignUp/SignUp";
import Login from "./CMSAdmin/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/

function App() {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignup = (newUser, authentication) => {
    setUser(newUser);
    console.log("User signed up:", newUser);
    setIsAuthenticated(authentication);
    console.log('auth:' , authentication);
  };

  const handleLogin = (loggedInUser , authentication) => {
    console.log("Loggedin user", loggedInUser);
    setUser(loggedInUser);
    setIsAuthenticated(authentication);
    console.log('authentication:' , authentication);
  };

  const handleLogout = async () => {
    // Update user status in db.json
    await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loggedIn: false })
    });

    setUser(null);
    setIsAuthenticated(false);
    // console.log('logout:', isAuthenticated);
  };

  useEffect(() => {
    console.log('Authentication:', isAuthenticated);
  }, [isAuthenticated]);
  
  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route path="/blogs/:id">
              <BlogDetails />
             </Route> */}
            <Route path="/works/:id">
              <PortfolioDetails />
            </Route>
            <Route path="/certifications/:id">
              <CertificationDetails />
            </Route>
            <Route path="/form" render={() => (
              <Form
                isAuthenticated={isAuthenticated}
                onSignup={handleSignup}
                onLogin={handleLogin}
              />
            )} />
            <Route path="/form/signup-form" render={() => (
              <SignUp onSignup={handleSignup} />
            )} />
            <Route path="/form/login-form" render={() => (
              <Login onLogin={handleLogin} />
            )} />
          </Switch>
        </div>
        <Footer />
        <ToastContainer />
      </div >
    </Router>
  );
}

export default App;
