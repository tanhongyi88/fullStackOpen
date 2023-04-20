import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import Form from "./components/Form";
import Notification from "./components/Notification";
import personService from "./service/person";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log("Fail to get all persons");
      });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notiMessage, setNotiMessage] = useState(null);
  const [notiType, setNotiType] = useState(null);
  let personToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
    personToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personToCheck = persons.find((person) => newName === person.name);
    if (personToCheck !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const input = {
          name: newName,
          number: newNumber,
        };
        personService
          .update(personToCheck.id, input)
          .then((updatedPerson) => {
            setPersons(
              persons
                .filter((person) => person.name !== updatedPerson.name)
                .concat(updatedPerson)
            );
          })
          .catch((error) => {
            console.log("Fail to update the person");
            setNotiMessage(
              `The person ${personToCheck.name}, has already been removed`
            );
            setNotiType("error");
            setTimeout(() => {
              setNotiMessage(null);
              setNotiType(null);
            }, 5000);
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      const input = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(input)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
          setNotiMessage(`Added ${newPerson.name}`);
          setNotiType("notification")
          setTimeout(() => {
            setNotiMessage(null);
            setNotiType(null);
          }, 5000);
        })
        .catch((error) => {
          console.log("Fail to add the number");
        });
    }
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personService
        .remove(person.id)
        .then(() => {
          const newPersons = persons.filter((p) => p.id !== person.id);
          setPersons(newPersons);
        })
        .catch((error) => {
          console.log("Fail to delete the number");
        });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notiMessage} type={notiType}/>
      <Filter handleFilter={handleFilter} value={filter}></Filter>
      <h1>Add a new</h1>
      <Form
        handleNewNameInput={handleNewName}
        nameInput={newName}
        handleNewNumberInput={handleNewNumber}
        numInput={newNumber}
        addPerson={addPerson}
      />
      <h1>Numbers</h1>
      {personToShow.map((p) => (
        <Person key={p.id} person={p} removePerson={() => removePerson(p)} />
      ))}
    </div>
  );
};

export default App;
