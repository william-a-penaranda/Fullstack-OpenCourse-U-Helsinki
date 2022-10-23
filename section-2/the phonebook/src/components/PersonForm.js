
const PersonForm = ({ 
    newName, 
    onChangeNewName, 
    newNumber,
    onChangeNewNumber,
    addNewPerson,
  }) => {
  return (
    <form>
      <div> name: <input value={newName} onChange={onChangeNewName}/></div>
      <div> number: <input value={newNumber} onChange={onChangeNewNumber}/></div>
      <div> <button type="submit" onClick={addNewPerson}>add</button></div>
    </form>
  )
}

export default PersonForm;