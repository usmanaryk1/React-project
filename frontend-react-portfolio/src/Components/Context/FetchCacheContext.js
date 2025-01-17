// createContext: Creates a new React Context object for sharing state
// useContext: Allows any component to access the context data.
// useState: Manages the state of the cache as an object
import { createContext, useContext, useState } from "react";

// Creates the FetchCacheContext, which serves as a container for storing and providing the cache state to components.
const FetchCacheContext = createContext();

// FetchCacheProvider: A component that wraps around other components and provides access to the context values.
// children: Represents the nested components that will have access to the context.
export const FetchCacheProvider = ({ children }) => {
  // useState({}): Initializes the cache as an empty object
  const [cache, setCache] = useState({});

  // Accepts a key (e.g., a URL) and retrieves the corresponding cached data from the cache object.
  const getCachedData = (key) => cache[key];

  // Ensures immutability of the cache object by creating a new state instead of modifying the existing one directly.
  const setCachedData = (key, data) => {
    setCache((prevCache) => ({ ...prevCache, [key]: data }));
  };

  return (
    // Allows any component within the provider's scope to access the getCachedData and setCachedData functions using useContext.
    <FetchCacheContext.Provider value={{ getCachedData, setCachedData }}>
      {children}
    </FetchCacheContext.Provider>
  );
};

// Instead of importing and calling useContext(FetchCacheContext) every time, you can simply use useFetchCache().
export const useFetchCache = () => useContext(FetchCacheContext);
