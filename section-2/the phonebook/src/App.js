import axios from 'axios';
import { useState, useEffect } from 'react';

import personsService from './services/service';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import SearchFilter from './components/SearchFilter';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons));
  }, [])


  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchWordChange = (event) => setSearchWord(event.target.value);

  const addNewPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName, 
      number: newNumber
    };
    
    const existingPerson = persons.find(person => person.name == newPerson.name);

    if (!!existingPerson){
      window.confirm(`${newPerson.name} is already added to phonebook, \
        replace the old number with a new one?`)
        ? personsService
          .modify(existingPerson.id, newPerson)
          .then(returnedPerson =>
            setPersons(persons.map(person => 
              person.id !== returnedPerson.id 
              ? person 
              : returnedPerson)))
        : window.alert(`${newPerson.name} not modified`);

    } else {
      personsService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
    setNewName("");
    setNewNumber("");
  }

  const deletePersonWithId = (id, name) => {
    window.confirm(`Delete ${name} ?`)
      ? personsService.deleteId(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
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