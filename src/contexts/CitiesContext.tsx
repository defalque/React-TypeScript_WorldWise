import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { City } from "../components/CityList";

type NewCity = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
};

type CitiesContextProviderProps = {
  children: ReactNode;
};

type CitiesState = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | undefined;
  error: string;
};

type CitiesContextValue = CitiesState & {
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: NewCity) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
};

const CitiesContext = createContext<CitiesContextValue | undefined>(undefined);

const URL = "http://localhost:8000";

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: undefined,
  error: "",
};

type Action =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: City[] }
  | { type: "city/loaded"; payload: City }
  | { type: "city/created"; payload: City }
  | { type: "city/deleted"; payload: string }
  | { type: "rejected"; payload: string };

function reducer(state: CitiesState, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload, error: "" };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: undefined,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }: CitiesContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${URL}/cities`);
        const data: City[] = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "rejected", payload: "Error while loading cities" });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (currentCity && id === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${URL}/cities/${id}`);
        const data: City = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "rejected", payload: "Error while loading city" });
      }
    },
    [currentCity]
  );

  async function createCity(newCity: NewCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "rejected", payload: "Error while creating city" });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      console.error(err);
      dispatch({ type: "rejected", payload: "Error while deleting city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside its provider");
  return context;
}

export { CitiesProvider, useCities };
