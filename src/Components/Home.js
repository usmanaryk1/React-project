import About from "./About";
import Blog from "./Blog";
import Contact from "./Contact";
import Counter from "./Counter";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <>
            <main id="main">
                <About />
                <Services />
                <Counter />
                <Portfolio />
                <Testimonial />
                <Blog />
                <Contact />
            </main>{/* End #main */}

        </>
    );
}

export default Home;