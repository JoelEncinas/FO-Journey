import { useState, useEffect } from "react";
import countryService from "./services/countries";

import Filter from "./components/Filter";
import TooMany from "./components/TooMany";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [countriesToShow, setcountriesToShow] = useState(null);
  const [tooManyCountries, setTooManyCountries] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setFilter(filterValue);

    if (filterValue === "") {
      setTooManyCountries(null);
    } else {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filterValue)
      );

      if (filteredCountries.length > 10) {
        setTooManyCountries(true);
        setCountry(null);
        setcountriesToShow(null);
      } else if (filteredCountries.length === 1) {
        setTooManyCountries(null);
        setCountry(filteredCountries[0]);
        setcountriesToShow(null);
      } else {
        setTooManyCountries(null);
        setCountry(null);
        setcountriesToShow(filteredCountries);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Backspace") {
      setFilter("");
      setTooManyCountries(null);
      setCountry(null);
      setcountriesToShow(null);
    }
  };

  return (
    <div className="App" onKeyDown={handleKeyDown}>
      <h1>Countries Finder</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {tooManyCountries && <TooMany />}
      {countriesToShow && <Countries countries={countriesToShow} />}
      {country && <Country country={country} />}
    </div>
  );
}

export default App;
