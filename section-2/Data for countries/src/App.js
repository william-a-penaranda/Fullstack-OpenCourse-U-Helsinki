import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplayCountries from './components/DisplayCountries';


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState("");


  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        console.log("fetched countries")
        setCountries(response.data)
      })
  }, [])

  const handleSearchWordChange = (event) => setSearchWord(event.target.value);

  return (
    <div>
      <p>find countries <input onChange={handleSearchWordChange} value={searchWord}/></p>
      
      <div>
        <DisplayCountries countries={countries} searchWord={searchWord} />
      </div>
    </div>
  );
}

export default App;