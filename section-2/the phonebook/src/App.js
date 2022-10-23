import axios from 'axios';
import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import SearchFilter from './components/SearchFilter';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("promise fulfilled");
        setPersons(response.data);
      })
  }, [])


  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchWordChange = (event) => setSearchWord(event.target.value);
  const addNewPerson = (event) => {
    event.preventDefault();

    persons.some(person => person.name === newName)
    ? window.alert(`${newName} is already added to phonebook`)
    : setPersons([...persons, { name: newName, number: newNumber}]);
    
    setNewName("");
    setNewNumber("");
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

      <Persons persons={filteredPersons} />
    </div>
  );
}

export default App;