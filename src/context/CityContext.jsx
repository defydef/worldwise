import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

// 1) Create a new Context component
const CityContext = createContext();

function CityProvider({ children }) {
  const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setIsLoading":
        return { ...state, isLoading: action.payload };
      case "setCities":
        return { ...state, cities: action.payload };
      case "setCurrentCity":
        return { ...state, currentCity: action.payload };
      case "addNewCity":
        return { ...state, cities: [...state.cities, action.payload] };
      case "deleteCity":
        return {
          ...state,
          cities: state.cities.filter((city) => city.id !== action.payload),
        };
      default:
        throw new Error("action type is not defined");
    }
  }

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    const controller = new AbortController();
    async function fetchCities() {
      try {
        dispatch({ type: "setIsLoading", payload: true });
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.Response === "False") throw new Error();
        dispatch({ type: "setCities", payload: data });
      } catch {
        alert("There was an error loading list of cities data");
      } finally {
        dispatch({ type: "setIsLoading", payload: false });
      }
    }
    fetchCities();
    // cleanup function
    return function () {
      controller.abort();
    };
  }, []);

  async function getCurrentCity(id) {
    try {
      dispatch({ type: "setIsLoading", payload: true });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.Response === "False") throw new Error();
      dispatch({ type: "setCurrentCity", payload: data });
    } catch {
      alert("There was an error loading currentCity data");
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "setIsLoading", payload: true });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "addNewCity", payload: data });
    } catch {
      alert("There was an error creating new city");
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "setIsLoading", payload: true });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "deleteCity", payload: id });
    } catch {
      alert("There was an error deleting city");
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }
  }

  // 2. Provide value to child components
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCurrentCity,
        currentCity,
        createCity,
        deleteCity,
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
