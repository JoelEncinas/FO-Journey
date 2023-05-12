const PersonForm = ({
  addPerson,
  newName,
  handleNewNameChange,
  newNumber,
  handleNewNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={handleNewNameChange}
            placeholder="Enter name"
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNewNumberChange}
            placeholder="Enter number"
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
