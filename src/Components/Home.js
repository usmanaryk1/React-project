import About from "./About";
import Blog from "./Blog";
// import BlogDetails from "./BlogDetails";
import Contact from "./Contact";
import Counter from "./Counter";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Testimonial from "./Testimonial";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";

const Home = () => {

    const {data : blogs , isPending , error} = useFetch("http://localhost:8000/blogs");
    const {data : works } = useFetch("http://localhost:8000/works");
    

    

    return (
        <>
            <Router>
                <main id="main">
                    <Hero />
                    <About />
                    <Services />
                    <Counter />
                    {/* <Portfolio  title = "Portfolio" subtitle= "Lorem ipsum, dolor sit amet consectetur adipisicing elit."/> */}
                    {/* {isLoading && <div>Loading...</div>} */}
                    {/* {bug && <div>{bug}</div>} */}
                    {works && <Portfolio title = "Portfolio" subtitle= "Lorem ipsum, dolor sit amet consectetur adipisicing elit." works = {works}/>}
                    <Testimonial />
                    {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    {blogs && <Blog blogs={blogs} title="Blogs" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." />}
                    {/* <BlogDetails /> */}
                    <Contact />
                </main>{/* End #main */}
            </Router>
        </>
    );
}

export default Home;