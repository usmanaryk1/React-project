import { createContext, useContext, useMemo } from "react";
import useFetch from "../../Components/useFetch";

const SectionVisibilityContext = createContext();

export const SectionVisibilityProvider = ({ children }) => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const {
    data: sections,
    setData: setSections,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/sectionVisibility`);
  //   const [sectionVisibility, setSectionVisibility] = useState({
  //     hero: true,
  //     about: true,
  //     skills: true,
  //     services: true,
  //     counter: true,
  //     works: true,
  //     testimonials: true,
  //     certifications: true,
  //     contacts: true,
  //     links: true,
  //   });

  //   const toggleVisibility = (sectionName) => {
  //     setSectionVisibility((prevState) => ({
  //       ...prevState,
  //       [sectionName]: !prevState[sectionName],
  //     }));
  //   };

  //   const sections = useMemo(() => {
  //     return Object.keys(sectionVisibility).map((key) => ({
  //       name: key,
  //       displayName: key.charAt(0).toUpperCase() + key.slice(1),
  //       isVisible: sectionVisibility[key],
  //     }));
  //   }, [sectionVisibility]);

  return (
    <SectionVisibilityContext.Provider
      value={{ sections, setSections, isPending, error }}
    >
      {children}
    </SectionVisibilityContext.Provider>
  );
};

export const useSectionVisibility = () => useContext(SectionVisibilityContext);
