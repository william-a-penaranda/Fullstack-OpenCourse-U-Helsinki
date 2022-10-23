
const Person = ({ personData }) => {
  const { name, number } = personData;
  return (
    <p>{`${name} ${number}`}</p>
  );
};


const Persons = ({ persons }) => {
  return(
    <div>
      {persons.map(person => <Person key={person.name} personData={person}/>)}
    </div>
  );
};

export default Persons;