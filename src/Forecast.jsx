function Forecast({weatherdata, loading}) {
  return (
    <>
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
    </>
  )
}

export default Forecast