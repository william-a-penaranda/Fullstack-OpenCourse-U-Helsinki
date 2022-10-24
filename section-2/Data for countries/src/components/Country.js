import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {

  const [weatherData, setWeatherData] = useState();
  const [lat, lon] = country.latlng;


  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => {
        setWeatherData(response.data);
      })
  }, [])


  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages)
          .map(([key, value]) => <li key={key}>{value}</li>)}
      </ul>
      <img alt={`${country.name.common} flag`} src={country.flags.png}/>
      {!!weatherData &&
        <div>
          <h2>Weather in {country.name.common}</h2>
          <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
          <p>wind {(weatherData.wind.speed).toFixed(2)} m/s</p>
        </div>
      }
    </div>
  )
}

export default Country;