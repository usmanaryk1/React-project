import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
// import BlogDetails from "./Components/BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PortfolioDetails from "./Components/PortfolioDetails";

// Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/

function App() {

return (
  <Router>
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
          <Route path="/works/:id">
            <PortfolioDetails />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div >
  </Router>
);
}

export default App;
