import './App.scss';
import axios from 'axios';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Forecast from './Forecast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
      <BrowserRouter>
        <Sidebar />
        <Header cityname={cityname} setCityname={setCityname} searchWeather={searchWeather} />
        
        <Routes>
          <Route path='/weather-app' element={<Forecast loading={loading} weatherdata={weatherdata} />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;