const Country = ({ country, weather }) => {
  console.log(weather);
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>
        Capital <strong>{country.capital}</strong>
      </p>
      <p>
        Area <strong>{country.area}</strong>
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((langKey) => (
          <li key={langKey}>{country.languages[langKey]}</li>
        ))}
      </ul>
      <img
        className="country-flag"
        src={country.flags.png}
        alt="flag of the country"
      />

      <div>
        <h3>Weather in {country.capital}</h3>
        <div>
          <p>Temperature {parseInt(weather.main.temp - 273)} ºC</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      </div>
    </>
  );
};

export default Country;
