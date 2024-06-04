import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Home />
      </div>
      <Footer />
    </div >
  );
}

export default App;
