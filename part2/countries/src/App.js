import { useState, useEffect } from "react";
import countryService from "./services/countries";

import Filter from "./components/Filter";
import TooMany from "./components/TooMany";
import CountriesToShow from "./components/CountriesToShow";

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
        setcountriesToShow(null);
      } else {
        setTooManyCountries(null);
        setcountriesToShow(filteredCountries);
      }
    }
  };

  return (
    <div className="App">
      <h1>Countries Finder</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {tooManyCountries && <TooMany />}
      {countriesToShow && <CountriesToShow countries={countriesToShow} />}
    </div>
  );
}

export default App;
