import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
      setPersonsToShow(initialNumbers);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const flag = persons.filter((person) => person.name === newName);

    if (flag.length !== 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setPersonsToShow(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setFilter("");
      });
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
      <Header title="Phonebook" />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <Header title="Add a new" />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />

      <Header title="Numbers" />
      <Persons persons={personsToShow} />
    </div>
  );
};

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

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
