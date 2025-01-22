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
    refetch,
  } = useFetch(`${API_URL}/api/sectionVisibility`);

  return (
    <SectionVisibilityContext.Provider
      value={{ sections, setSections, isPending, error, refetch }}
    >
      {children}
    </SectionVisibilityContext.Provider>
  );
};

export const useSectionVisibility = () => useContext(SectionVisibilityContext);
