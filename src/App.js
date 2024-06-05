import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router} from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Home />
        </div>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
