import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import BlogDetails from "./Components/BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

function App() {
 
  useEffect(() => {

    // Create a script element
    const script1 = document.createElement('script');
    script1.src = `${process.env.PUBLIC_URL}/assets/js/main.js`;
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = `${process.env.PUBLIC_URL}/assets/vendor/swiper/swiper-bundle.min.js`;
    script2.async = true;
    

    // Append the script to the body
    document.body.appendChild(script1);
    document.body.appendChild(script2);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
    
}, [])

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
