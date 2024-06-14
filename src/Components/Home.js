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
import useFetch from "./useFetch";


const Home = () => {

    const { data: about, isPending, error } = useFetch("http://localhost:8000/about")
    // const { data: blogs } = useFetch("http://localhost:8000/blogs");
    const { data: certifications } = useFetch("http://localhost:8000/certifications");
    const { data: works } = useFetch("http://localhost:8000/works");
    const { data: services } = useFetch("http://localhost:8000/services");
    const { data: testimonials } = useFetch("http://localhost:8000/testimonials");
    const { data: counts } = useFetch("http://localhost:8000/counts");

    // console.log("About props:", about);
    
    return (
        <>
            <main id="main">
                <Hero />
                {about && <About about={about} />}
                {services && <Services services={services} title="Services" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />}
                {counts && <Counter counts={counts} />}
                {works && <Portfolio title="Portfolio" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." works={works} />}
                {testimonials && <Testimonial testimonials={testimonials} />}
                {isPending && <div className="loading"> Loading...</div>}
                {error && <div className="error">{error}</div>}
                {/* {blogs && <Blog blogs={blogs} title="Blogs" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />} */}
                {certifications && <Certifications certifications={certifications} title="Certifications" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />}
                <Contact />
            </main>
            {/* End #main */}
        </>
    );
}

export default Home;