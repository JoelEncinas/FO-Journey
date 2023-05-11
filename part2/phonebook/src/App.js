import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [personsToShow, setPersonsToShow] = useState(persons);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    const flag = persons.filter((person) => person.name === newName);

    if (flag.length !== 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(person));
      setPersonsToShow(persons.concat(person));
      setNewName("");
      setNewNumber("");
      setFilter("");
    }
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setFilter(e.target.value);

    if (filter === "") {
      setPersonsToShow(persons);
    } else {
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filterValue)
      );
      setPersonsToShow(filteredPersons);
    }
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter name"
        />
      </div>
      <h2>Add a new</h2>
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
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default App;
