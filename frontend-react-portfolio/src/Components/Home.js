import { useMemo } from "react";
import About from "./About";
import Certifications from "./Certifications";
// import Blog from "./Blog";
// import BlogDetails from "./BlogDetails";
import Contact from "./Contact";
import Counter from "./Counter";
import Error from "./Error/Error";
import Hero from "./Hero";
import Loading from "./Loading/Loading";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Testimonial from "./Testimonial";
import useFetch from "./useFetch";

const Home = () => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );
  // const API_URL =
  //   process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api/";

  const { data: hero, isPending, error } = useFetch(`${API_URL}/api/hero`);
  const { data: about } = useFetch(`${API_URL}/api/about`);
  const { data: skills } = useFetch(`${API_URL}/api/skills`);
  const { data: services } = useFetch(`${API_URL}/api/services`);
  const { data: counts } = useFetch(`${API_URL}/api/counts`);
  const { data: works } = useFetch(`${API_URL}/api/works`);
  const { data: testimonials } = useFetch(`${API_URL}/api/testimonials`);
  const { data: certifications } = useFetch(`${API_URL}/api/certifications`);
  const { data: contacts } = useFetch(`${API_URL}/api/contact`);
  const { data: links } = useFetch(`${API_URL}/api/social`);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <main id="main">
        <Hero hero={hero || []} />
        <About about={about || []} skills={skills || []} />
        <Services
          title="Services"
          subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          services={services || []}
        />
        <Counter counts={counts || []} />
        <Portfolio
          title="Portfolio"
          subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          works={works || []}
        />
        <Testimonial testimonials={testimonials || []} />
        {/*<Blog title="Blogs" subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit." /> */}
        <Certifications
          title="Certifications"
          subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          certifications={certifications || []}
        />
        <Contact contact={contacts || []} links={links || []} />
      </main>
      {/* End #main */}
    </>
  );
};

export default Home;
