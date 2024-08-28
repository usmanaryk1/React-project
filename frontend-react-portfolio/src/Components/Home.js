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
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const { data: about } = useFetch(`${API_URL}/api/about`);
  const { data: services } = useFetch(`${API_URL}/api/services`);
  const { data: counts } = useFetch(`${API_URL}/api/counts`);
  const { data: works } = useFetch(`${API_URL}/api/works`);
  const { data: testimonials } = useFetch(`${API_URL}/api/testimonials`);
  const { data: certifications } = useFetch(`${API_URL}/api/certifications`);
  const { data: contacts } = useFetch(`${API_URL}/api/contact`);
  const { data: links } = useFetch(`${API_URL}/api/social`);

  return (
    <>
      <main id="main">
        <Hero />
        <About about={about} />
        <Services
          title="Services"
          subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          services={services}
        />
        <Counter counts={counts} />
        <Portfolio
          title="Portfolio"
          subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          works={works}
        />
        <Testimonial testimonials={testimonials} />
        {/*<Blog title="Blogs" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." /> */}
        <Certifications
          title="Certifications"
          subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          certifications={certifications}
        />
        <Contact contact={contacts} links={links} />
      </main>
      {/* End #main */}
    </>
  );
};

export default Home;
