import { createContext, useContext, useMemo, useState } from "react";
import useFetch from "../../Components/useFetch";

const SectionVisibilityContext = createContext();

export const SectionVisibilityProvider = ({ children }) => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  // Local state to cache data
  const [cachedSections, setCachedSections] = useState(null);

  const {
    data: sections,
    setData: setSections,
    isPending,
    error,
    refetch,
  } = useFetch(`${API_URL}/api/sectionVisibility`, {
    manual: cachedSections !== null, // Prevent initial fetch if data is cached
  });

  // Always update cache when new data arrives
  useMemo(() => {
    if (sections) {
      setCachedSections(sections);
    }
  }, [sections]);

  // Custom refetch function that forces a new fetch and updates the cache
  const refreshSections = async () => {
    const newData = await refetch(); // Fetch latest data
    if (newData) {
      setCachedSections(newData);
    }
  };

  return (
    <SectionVisibilityContext.Provider
      value={{
        sections: cachedSections || sections,
        setSections,
        isPending,
        error,
        refetch: refreshSections, // Use custom refetch function
      }}
    >
      {children}
    </SectionVisibilityContext.Provider>
  );
};

export const useSectionVisibility = () => useContext(SectionVisibilityContext);
