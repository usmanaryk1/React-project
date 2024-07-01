import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
// import BlogDetails from "./Components/BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PortfolioDetails from "./Components/PortfolioDetails";
import { useState } from "react";
import CertificationDetails from "./Components/CertificationDetails";
import Form from "./CMSAdmin/Form";
import SignUp from "./CMSAdmin/Auth/SignUp/SignUp";
import Login from "./CMSAdmin/Auth/Login/Login";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/

function App() {

  const [user, setUser] = useState(null);
  const history = useHistory();

  const handleSignup = (newUser) => {
    setUser(newUser);
    console.log("User signed up:", newUser);
    history.push("/#hero");
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    // Update user status in db.json
    await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loggedIn: false })
    });

    setUser(null);
  };

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
            <Route path="/form">
              <Form />
            </Route>
            <Route path="/form/signup-form">
              <SignUp onSignup={handleSignup} />
            </Route>
            <Route path="/form/login-form">
              <Login onLogin={handleLogin} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
