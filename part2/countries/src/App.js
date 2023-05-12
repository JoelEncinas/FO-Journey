import { useState, useEffect } from "react";
import countryService from "./services/countries";

import Filter from "./components/Filter";
import TooMany from "./components/TooMany";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [countriesToShow, setcountriesToShow] = useState(null);
  const [tooManyCountries, setTooManyCountries] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((countries) => {
      setCountries(countries);
      console.log(countries);
    });
  }, []);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);

    if (filterValue === "") {
      setTooManyCountries(null);
    } else {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filterValue)
      );

      if (filteredCountries.length > 10) {
        setTooManyCountries(true);
        setcountriesToShow(null);
      } else {
        setTooManyCountries(null);
        setcountriesToShow(filteredCountries);
      }
    }
  };

  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {tooManyCountries && <TooMany />}
      {countriesToShow &&
        countriesToShow.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
    </div>
  );
}

export default App;
