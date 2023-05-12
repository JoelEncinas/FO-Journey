const Country = ({ country }) => {
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
      <img className="country-flag" src={country.flags.png} alt="flag of the country" />
    </>
  );
};

export default Country;
