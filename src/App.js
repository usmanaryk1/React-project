import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
// import BlogDetails from "./Components/BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PortfolioDetails from "./Components/PortfolioDetails";
import { useEffect } from "react";
import CertificationDetails from "./Components/CertificationDetails";
import Form from "./Admin/Form";
// Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/

function App() {

  useEffect(() => {
    const preloader = document.getElementById('preloader');

    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <div id="preloader"></div> */}
        <Header />
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
          </Switch>
        </div>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
