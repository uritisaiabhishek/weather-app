import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [weatherdata, setWeather] = useState(null); // State to store weather data
  const [cityname, setCityname] = useState('');
  const [loading, setLoading] = useState(false);
  const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api_key}&units=metric`;
  const searchWeather = () => {
    setLoading(true);
    cityname && (axios.get(apiURL)
      .then(response => {
        console.log(response.data);
        // axios.get(https://api.openweathermap.org/data/2.5/forecast/daily?q=hyderabad&cnt=7&appid=${api_key}&units=metric).then(dailyresponse => {
        //   console.log(dailyresponse);
        // });
        setLoading(true);
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error:', error); // Handle error
      })
    )
  };

  return (
    <div className="App">
      <header> 
        <h1>Weather app</h1>
      </header>
      <div className='city_search'>
        <input
          name="cityname"
          value={cityname}
          onChange={(e) => setCityname(e.target.value)}
        />
        <button onClick={searchWeather}>Search</button>
      </div>

      {
        !loading ? 
        <div className='weather_container'>Loading...</div>:
        <div className='weather_container'>
            {weatherdata && (
              <>
              <h2>Current Weather in - {weatherdata.name}</h2>
              {weatherdata.sys && (
                <p>Country: {weatherdata.sys.country}</p>
              )}
              {weatherdata.sys && weatherdata.sys.sunrise && (
                <p>Sunrise: {new Date(weatherdata.sys.sunrise * 1000).toLocaleTimeString()}</p>
              )}
              {weatherdata.sys && weatherdata.sys.sunset && (
                <p>Sunset: {new Date(weatherdata.sys.sunset * 1000).toLocaleTimeString()}</p>
              )}
              {weatherdata.weather && weatherdata.weather[0] && (
                <>
                  <p>Weather: {weatherdata.weather[0].description}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}.png`}
                    alt="Weather icon"
                  />
                </>
              )}
              {weatherdata.main && (
                <>
                  <p>Temperature: {weatherdata.main.temp}</p>
                  <p>Temperature Maximum: {weatherdata.main.temp_max}</p>
                  <p>Temperature Minimum: {weatherdata.main.temp_min}</p>
                  {weatherdata.main.sea_level && <p>Sea Level: {weatherdata.main.sea_level}</p>}
                  <p>Pressure: {weatherdata.main.pressure}</p>
                  <p>Humidity: {weatherdata.main.humidity}</p>
                </>
              )}
              {weatherdata.wind && (
                <>
                  <p>Wind Speed: {weatherdata.wind.speed}</p>
                  <p>Wind Degree: {weatherdata.wind.deg}</p>
                  {weatherdata.wind.gust && <p>Wind Gust: {weatherdata.wind.gust}</p>}
                </>
              )}
              </>
            )}
        </div>
      }
    </div>
  );
}

export default App;