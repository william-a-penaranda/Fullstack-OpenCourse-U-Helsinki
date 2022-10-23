import { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import SearchFilter from './components/SearchFilter';


const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");

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