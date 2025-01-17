import { useMemo } from "react";
import About from "./About";
import Certifications from "./Certifications";
// import Blog from "./Blog";
// import BlogDetails from "./BlogDetails";
import Contact from "./Contact/Contact";
import Counter from "./Counter";
import Error from "./Error/Error";
import Hero from "./Hero";
import Loading from "./Loading/Loading";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Testimonial from "./Testimonial";
import useFetch from "./useFetch";
import { useSectionVisibility } from "../CMSAdmin/SectionVisibilityContext/SectionVisibilityContext";
import Publications from "./Publications/Publications";

const Home = () => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const { data: hero, isPending, error } = useFetch(`${API_URL}/api/hero`);
  const { data: about } = useFetch(`${API_URL}/api/about`);
  const { data: skills } = useFetch(`${API_URL}/api/skills`);
  const { data: services } = useFetch(`${API_URL}/api/services`);
  const { data: counts } = useFetch(`${API_URL}/api/counts`);
  const { data: works } = useFetch(`${API_URL}/api/works`);
  const { data: testimonials } = useFetch(`${API_URL}/api/testimonials`);
  const { data: publications } = useFetch(`${API_URL}/api/publications`);
  const { data: certifications } = useFetch(`${API_URL}/api/certifications`);
  const { data: contacts } = useFetch(`${API_URL}/api/contact`);
  const { data: links } = useFetch(`${API_URL}/api/social`);
  const { sections = [] } = useSectionVisibility();

  // console.log("section in home:", sectionData);
  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  // Helper function to check if a section should be rendered
  const shouldRenderSection = (name) =>
    sections.find((section) => section.name === name && section.isVisible);

  return (
    <>
      <main id="main">
        {sections && shouldRenderSection("Hero Section") && (
          <Hero hero={hero || []} />
        )}
        {sections && shouldRenderSection("About Section") && (
          <About about={about || []} skills={skills || []} />
        )}
        {sections && shouldRenderSection("Services Section") && (
          <Services
            title="Services"
            subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            services={services || []}
          />
        )}
        {sections && shouldRenderSection("Counter Section") && (
          <Counter counts={counts || []} />
        )}
        {sections && shouldRenderSection("Portfolio Section") && (
          <Portfolio
            title="Portfolio"
            subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            works={works || []}
          />
        )}
        {sections && shouldRenderSection("Testimonial Section") && (
          <Testimonial testimonials={testimonials || []} className="mt-5" />
        )}
        {sections && shouldRenderSection("Publications Section") && (
          <Publications publications={publications || []} />
        )}
        {sections && shouldRenderSection("Certifications Section") && (
          <Certifications
            title="Certifications"
            subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            certifications={certifications || []}
          />
        )}
        {sections && shouldRenderSection("Contact Section") && (
          <Contact contact={contacts || []} links={links || []} />
        )}
      </main>
      {/* End #main */}
    </>
  );
};

export default Home;
