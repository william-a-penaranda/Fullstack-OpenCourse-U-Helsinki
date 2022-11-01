import { useState, useEffect } from 'react';

import personsService from './services/service';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import SearchFilter from './components/SearchFilter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [notificationMsg, setNotificationMsg] = useState({
    msg: null,
    sucessful: null,
  });

  useEffect(() => {
    personsService.getAll().then(initialPersons => setPersons(initialPersons));
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchWordChange = (event) => setSearchWord(event.target.value);

  const addNewPerson = (event) => {
    event.preventDefault();

    const newPerson = { name: newName.trim(), number: newNumber.trim() };
    
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (!existingPerson) {
      personsService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMsg({
            msg: `Added ${returnedPerson.name}`,
            sucessful: true,
          });
        })
        .catch(error => {
          setNotificationMsg({
            msg: `${error.response.data.error}`,
            sucessful: false,
          });
        });
    } else {
      personsService.modify(existingPerson.id, newPerson)
        .then(returnedPerson =>{
          setPersons(persons.map(person => 
            person.name.toLowerCase() === returnedPerson.name.toLowerCase()
            ? returnedPerson
            : person));
          setNotificationMsg({
            msg: `Modified ${returnedPerson.name}`,
            sucessful: true,
          });
        })
        .catch(error => {
          setNotificationMsg({
            msg: `${error.response.data.error}`,
            sucessful: false,
          });
        });
    }

    setTimeout(() => setNotificationMsg({msg: null, sucessful: null}), 5000);
    setNewName("");
    setNewNumber("");
  }

  const deletePersonWithId = (id, name) => {
    window.confirm(`Delete ${name} ?`)
      ? personsService.deleteId(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotificationMsg({
            msg: `${name} was sucessfully deleted from server`,
            sucessful: true,
          });
          setTimeout(() => setNotificationMsg({msg: null, sucessful: null}), 5000);
        })

      : window.alert(`${name} NOT deleted`);
  }

  const filteredPersons = searchWord === ""
    ? persons
    : persons.filter(
        person => person.name
                    .toLowerCase()
                    .includes(searchWord.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsg} />
      <SearchFilter searchWord={searchWord} onChange={handleSearchWordChange}/>
      
      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        onChangeNewName={handleNameChange} 
        newNumber={newNumber}
        onChangeNewNumber={handleNumberChange} 
        addNewPerson={addNewPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deletePerson={deletePersonWithId}/>
    </div>
  );
}

export default App;