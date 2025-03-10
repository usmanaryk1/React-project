import { useMemo } from "react";
import About from "./About";
import Certifications from "./Certifications";
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
import DynamicSections from "./DynamicSections/DynamicSections";
import TermsandConditions from "./TermsAndConditions/Terms&Conditions";

const Home = () => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const { data: hero } = useFetch(`${API_URL}/api/hero`);
  const { data: about } = useFetch(`${API_URL}/api/about`);
  const { data: skills } = useFetch(`${API_URL}/api/skills`);
  const { data: services } = useFetch(`${API_URL}/api/services`);
  const { data: counts } = useFetch(`${API_URL}/api/counts`);
  const { data: works } = useFetch(`${API_URL}/api/works`);
  const { data: testimonials } = useFetch(`${API_URL}/api/testimonials`);
  const { data: dynamicSections } = useFetch(`${API_URL}/api/dynamicSections`);
  const { data: certifications } = useFetch(`${API_URL}/api/certifications`);
  const { data: contacts } = useFetch(`${API_URL}/api/contact`);
  const { data: links } = useFetch(`${API_URL}/api/social`);
  const { data: termsList } = useFetch(`${API_URL}/api/terms`);

  const { sections = [], isPending, error } = useSectionVisibility();
  // Sort and filter sections based on visibility and order
  const visibleSections = useMemo(() => {
    return (sections || []) // Ensure sections is an array
      .filter((section) => section.isVisible) // Filter out invisible sections
      .sort((a, b) => a.order - b.order); // Sort by order
  }, [sections]);

  // Check for loading and error states
  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }
  // console.log("matchedDynamic section", matchedDynamicSection);
  console.log("Dynamic Sections from API:", dynamicSections);
  console.log("Visible Sections from Context:", visibleSections);
  return (
    <>
      <main id="main">
        {visibleSections.map((section) => {
          if (section.isDynamic) {
            const matchedDynamic = dynamicSections?.find(
              (dynamicSection) =>
                dynamicSection.name.trim() === section.name.trim()
            );

            if (matchedDynamic) {
              return (
                <DynamicSections
                  key={section._id}
                  dynamicSections={[matchedDynamic]}
                  className="mb-5"
                />
              );
            }
            return null;
          }

          // Handle static sections
          switch (section.name) {
            case "Hero":
              return <Hero key={section._id} hero={hero || []} />;
            case "About":
              return (
                <About
                  key={section._id}
                  about={about || []}
                  skills={skills || []}
                />
              );
            case "Services":
              return (
                <Services
                  key={section._id}
                  services={services || []}
                  title="Services"
                  subtitle="Delivering solutions that exceed expectations."
                />
              );
            case "Counter":
              return <Counter key={section._id} counts={counts || []} />;
            case "Portfolio":
              return (
                <Portfolio
                  key={section._id}
                  works={works || []}
                  title="Portfolio"
                  subtitle="We turn ideas into impactful results."
                />
              );
            case "Testimonial":
              return (
                <Testimonial
                  key={section._id}
                  testimonials={testimonials || []}
                />
              );
            case "Certifications":
              return (
                <Certifications
                  key={section._id}
                  title="Certifications"
                  subtitle="Showcasing milestones of excellence"
                  certifications={certifications || []}
                />
              );

            case "Terms and Conditions":
              return (
                <TermsandConditions
                  key={section._id}
                  termsList={termsList || []}
                  className="mt-5"
                />
              );

            case "Contact":
              return (
                <Contact
                  key={section._id}
                  contact={contacts || []}
                  links={links || []}
                />
              );
            default:
              return null;
          }
        })}
      </main>
      {/* End #main */}
    </>
  );
};

export default Home;
