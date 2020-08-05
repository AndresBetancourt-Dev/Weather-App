import React, {useState} from 'react';
import api from './api'

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (event) => {
      if(event.key === "Enter"){
          const response = await fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`);
          const data = await response.json();
          setWeather(data);
          setQuery('');
          console.log(data)
      }
  }

  const parseDate = (date) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    return `${day}, ${month}  ${date.getDate()} ${date.getFullYear()}`
  }

  const roundTemperature = (temperature) => Math.round(temperature);
  const warmOrCold = (temperature) => temperature < 16;

  return (
    <div className="app">
      <main className={(typeof weather.main != "undefined")? (warmOrCold(weather.main.temp)? "weather cold": "weather") : "weather"}>
      <div className="weather-searchbox">
        <input className="weather-input" type="text" placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined")? 
      <React.Fragment>
      <div className="info">
        <div className="city">
          <div className="info-weather">{roundTemperature(weather.main.temp)}°</div>
          <div className="info-city">{weather.name}</div>
        </div>
        
        <div className="info-date">{parseDate(new Date())}</div>
      </div>
      </React.Fragment>: null
      }
      </main>  
    </div>
  );
}

export default App;
