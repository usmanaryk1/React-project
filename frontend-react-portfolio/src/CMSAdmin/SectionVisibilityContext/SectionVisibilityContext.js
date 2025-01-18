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

  return (
    <SectionVisibilityContext.Provider
      value={{ sections, setSections, isPending, error }}
    >
      {children}
    </SectionVisibilityContext.Provider>
  );
};

export const useSectionVisibility = () => useContext(SectionVisibilityContext);
