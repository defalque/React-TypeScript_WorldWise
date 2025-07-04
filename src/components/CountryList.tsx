// import type { City } from "./CityList";
import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export type Country = {
  emoji: string;
  country: string;
};

// type CountryListProps = {
//   cities: City[];
//   isLoading: boolean;
// };

// function CountryList({ cities, isLoading }: CountryListProps) {
function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner></Spinner>;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map"></Message>
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, [] as Country[]);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country}></CountryItem>
      ))}
    </ul>
  );
}

export default CountryList;
