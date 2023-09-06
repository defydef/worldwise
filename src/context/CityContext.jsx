import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

// 1) Create a new Context component
const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const controller = new AbortController();
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.Response === "False") throw new Error();
        setCities(data);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
    // cleanup function
    return function () {
      controller.abort();
    };
  }, []);

  // 2. Provide value to child components
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error(
      "useCities is undefined because it is defined inside the children component of App"
    );
  return context;
}

export { CityProvider, useCities };
