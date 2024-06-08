import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import BlogDetails from "./Components/BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route>
              <Home />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
