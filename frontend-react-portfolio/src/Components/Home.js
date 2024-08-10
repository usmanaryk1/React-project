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

        const { data: about } = useFetch("http://localhost:8000/about")
        const { data: services} = useFetch("http://localhost:8000/services");
        const { data: counts } = useFetch("http://localhost:8000/counts");
        const { data: works } = useFetch("http://localhost:8000/works");
        const { data: testimonials } = useFetch("http://localhost:8000/testimonials");
        const { data: certifications } = useFetch("http://localhost:8000/certifications");
        const { data: contacts } = useFetch("http://localhost:8000/contact");
        const { data: links } = useFetch("http://localhost:8000/social");

    return (
        <>
            <main id="main">
                <Hero />
                <About 
                    about={about}
                />
                <Services
                    title="Services" 
                    subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." 
                    services={services}
                />
                <Counter 
                    counts={counts}
                />
                <Portfolio 
                    title="Portfolio" 
                    subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." 
                    works={works}
                />
                <Testimonial 
                    testimonials={testimonials}
                />
                {/*<Blog title="Blogs" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." /> */}
                <Certifications 
                    title="Certifications" 
                    subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." 
                    certifications={certifications}
                />
                <Contact 
                    contact={contacts}
                    links={links}
                />
            </main>
            {/* End #main */}
        </>
    );
}

export default Home;