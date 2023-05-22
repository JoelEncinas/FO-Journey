const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={filter}
        onChange={handleFilterChange}
        placeholder="Enter name"
      />
    </div>
  );
};

export default Filter;
