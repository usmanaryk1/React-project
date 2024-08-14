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
  const { data: about } = useFetch("/about");
  const { data: services } = useFetch("/services");
  const { data: counts } = useFetch("/counts");
  const { data: works } = useFetch("/works");
  const { data: testimonials } = useFetch("/testimonials");
  const { data: certifications } = useFetch("/certifications");
  const { data: contacts } = useFetch("/contact");
  const { data: links } = useFetch("/social");

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
