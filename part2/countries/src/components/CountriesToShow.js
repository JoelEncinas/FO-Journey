const CountriesToShow = ({ countries }) => {
  return (
    <ul className="countries-list">
      {countries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
};

export default CountriesToShow;
