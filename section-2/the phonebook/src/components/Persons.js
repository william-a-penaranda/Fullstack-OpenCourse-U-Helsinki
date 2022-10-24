import personsService from "../services/service";

const Person = ({ personData, deletePersonWithId }) => {
  const { name, number, id } = personData;
  return (
    <p>
      {`${name} ${number} `}
      <button onClick={() => deletePersonWithId(id, name)}>delete</button>
    </p>
  );
};


const Persons = ({ persons, deletePerson }) => {
  return(
    <div>
      {persons.map(person => 
        <Person 
          key={person.id} 
          personData={person}
          deletePersonWithId={deletePerson}
        />
      )}
    </div>
  );
};

export default Persons;