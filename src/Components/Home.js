import About from "./About";
import Blog from "./Blog";
import BlogDetails from "./BlogDetails";
import Contact from "./Contact";
import Counter from "./Counter";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Testimonial from "./Testimonial";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const Home = () => {

    const { data: blogs } = useFetch("http://localhost:8000/blogs");
    const { data: works } = useFetch("http://localhost:8000/works");
    const { data: services } = useFetch("http://localhost:8000/services");
    const { data: testimonials } = useFetch("http://localhost:8000/testimonials");
    const { data: counts } = useFetch("http://localhost:8000/counts");



    return (
        <>
            <Router>
                <main id="main">
                    <Hero />
                    <About />
                    {services && <Services services={services} title="Services" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />}
                    {counts && <Counter counts={counts} />}
                    {works && <Portfolio title="Portfolio" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." works={works} />}
                    {testimonials && <Testimonial testimonials={testimonials} />}
                    {blogs && <Blog blogs={blogs} title="Blogs" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />}
                    <Switch>
                        <Route path = "/blogs/:id">
                            <BlogDetails />
                        </Route>
                    </Switch>
                    <Contact />
                </main>{/* End #main */}
            </Router>
        </>
    );
}

export default Home;