import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
// import BlogDetails from "./Components/BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PortfolioDetails from "./Components/PortfolioDetails";

function App() {

  useEffect(() => {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <div id="preloader"></div>
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
