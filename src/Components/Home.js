import About from "./About";
import Certifications from "./Certifications";
// import Blog from "./Blog";
// import BlogDetails from "./BlogDetails";
import Contact from "./Contact";
import Counter from "./Counter";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Testimonial from "./Testimonial";

const Home = () => {

    // 

    // console.log("About props:", about);
    
    return (
        <>
            <main id="main">
                <Hero />
                <About />
                <Services title="Services" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
                <Counter />
                <Portfolio title="Portfolio" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
                <Testimonial />
                {/*<Blog title="Blogs" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." /> */}
                <Certifications title="Certifications" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />
                <Contact />
            </main>
            {/* End #main */}
        </>
    );
}

export default Home;