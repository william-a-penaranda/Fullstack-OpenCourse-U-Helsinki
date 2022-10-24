import { useEffect, useState } from "react";
import Country from "./Country"

const DisplayCountries = ({ countries, searchWord }) => {
  
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  useEffect(() => {
    searchWord === ""
    ? setFilteredCountries([])
    : setFilteredCountries(countries.filter(country => country.name.common
      .toLowerCase()
      .includes(searchWord.toLowerCase())
    ));
  }, [countries, searchWord]);

  const handleShow = (id) => () => {
    setFilteredCountries(filteredCountries.filter(country => country.cca3 === id));
  }

  if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} />
    )
  } else if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  return (
    <>
      {filteredCountries.map((country) => 
        <div key={country.cca3}>
          <p>
            {country.name.common}
            <button onClick={handleShow(country.cca3)}>show</button>
          </p>
        </div>
      )}
    </>
  )
}

export default DisplayCountries;