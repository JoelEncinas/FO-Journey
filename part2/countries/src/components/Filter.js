const Filter = ({ filter, handleFilterChange }) => {
  return (
    <>
      Find countries: <input value={filter} onChange={handleFilterChange} placeholder="spain" />
    </>
  );
};

export default Filter;
