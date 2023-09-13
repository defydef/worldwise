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
      case "cities/loaded":
        return {
          ...state,
          cities: action.payload,
          isLoading: false,
        };
      case "cities/currentCity":
        return {
          ...state,
          currentCity: action.payload,
          isLoading: false,
        };
      case "cities/created":
        return {
          ...state,
          cities: [...state.cities, action.payload],
          isLoading: false,
        };
      case "cities/deleted":
        return {
          ...state,
          cities: state.cities.filter((city) => city.id !== action.payload),
          isLoading: false,
        };
      case "loading":
        return { ...state, isLoading: true };
      default:
        throw new Error("action type is not defined");
    }
  }

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    const controller = new AbortController();
    async function fetchCities() {
      dispatch({
        type: "loading",
      });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.Response === "False") throw new Error();
        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch {
        alert("There was an error loading list of cities data");
      }
    }
    fetchCities();
    // cleanup function
    return function () {
      controller.abort();
    };
  }, []);

  async function getCurrentCity(id) {
    dispatch({
      type: "loading",
    });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.Response === "False") throw new Error();
      dispatch({
        type: "cities/currentCity",
        payload: data,
      });
    } catch {
      alert("There was an error loading currentCity data");
    }
  }

  async function createCity(newCity) {
    dispatch({
      type: "loading",
    });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch {
      alert("There was an error creating new city");
    }
  }

  async function deleteCity(id) {
    dispatch({
      type: "loading",
    });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      alert("There was an error deleting city");
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
