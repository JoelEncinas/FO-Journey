import { useState, useEffect } from "react";
import Header from "./components/Header";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((numbers) => {
        setPersons(numbers);
        setPersonsToShow(numbers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addPerson = async (e) => {
    e.preventDefault();

    const person = persons.find((person) => person.name === newName);

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number: newNumber };

        await personService
          .updatePerson(person.id, changedPerson)
          .catch((error) => {
            setMessage({ message: error.response.data.error, error: true });
          });
        setTimeout(() => {
          setMessage(null);
        }, 3000);

        await personService.getAll().then((numbers) => {
          setPersons(numbers);
          setPersonsToShow(numbers);
        });

        setMessage({
          message: `Number for ${person.name} updated`,
          error: false,
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .createPerson(personObject)
        .then((returnedPerson) => {
          setMessage({
            message: `Added ${personObject.name}`,
            error: false,
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);

          setPersons(persons.concat(returnedPerson));
          setPersonsToShow(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setFilter("");
        })
        .catch((error) => {
          setMessage({
            message: error.response.data.error,
            error: true,
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  const deletePerson = async (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      await personService.deletePerson(id).catch((e) => {
        setMessage({
          message: `Information of ${name} has already been removed from server`,
          error: true,
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });

      personService.getAll().then((numbers) => {
        setPersons(numbers);
        setPersonsToShow(numbers);
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
      {message && (
        <Notification message={message.message} error={message.error} />
      )}
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
