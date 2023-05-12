const Countries = ({ countries, showCountry }) => {
  return (
    <ul className="countries-list">
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => showCountry(country.name.common)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
