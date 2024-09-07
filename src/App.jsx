import SunIcon from "./assets/sun.png";
import WindIcon from "./assets/wind.png";
import CloudIcon from "./assets/cloud.png";
import DrizzleIcon from "./assets/drizzle.png";
import HumidityIcon from "./assets/humidity.png";
import SearchIcon from "./assets/search.png";
import RainIcon from "./assets/rain.png";
import SnowIcon from "./assets/snow.png";
import ThunderIcon from "./assets/thunder.png";
import BrokenIcon from "./assets/broken.png";
import MoonIcon from "./assets/moon.png";
import MoonCloudIcon from "./assets/mooncloud.png";
import MistIcon from "./assets/mist.png";
import './App.css';
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Sun=({icon,temp,city,country,lat,hum,humper,windper,wind})=>{
  return(
  <>
    <div className="Image">
      <img src={icon} alt="Sun" className="SunIcon"/>
    </div>
    <div className="temp">{temp}°C</div>
    <div className="city">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div className="lat">
        <span className="latt">Lattitude</span>
        <span>{lat}</span>
      </div>
      <div className="lot">
        <span className="lott">Longitude</span>
        <span>{lat}</span>
      </div>
    </div>
    <div className="hum-wind">
    <div className="hum">
      <div className="hum-img">
        <img src={hum} alt="humidity" />
      </div>
      <div className="hum-per">
        {humper}%
      </div>
      <div className="hum-name">Humidity</div>
    </div>
    
    <div className="wind">
      <div className="wind-img">
        <img src={wind} alt="Wind Speed" />
      </div>
      <div className="wind-per">
        {windper} Km/h
      </div>
      <div className="hum-name">Wind Speed</div>
    </div>
    </div>
    </>
  )
 
}
Sun.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  lat:PropTypes.number.isRequired,
  hum:PropTypes.number.isRequired,
  humper:PropTypes.string.isRequired,
  windper:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
}

function App() {

  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null)
  
  let api_key="f5a8699923f23886c078807e5d1c29eb";
  const [text,setText]=useState("Madurai");

  const [icon,setIcon]=useState(SunIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("chennai");
  const [country,setCountry]=useState("in");
  const [lat,setLat]=useState(0);
  const [lot,setLot]=useState(0)
  const [hum,setHum]=useState(HumidityIcon);
  const [humper,setHumper]=useState(0)
  const [wind,setWind]=useState(WindIcon);
  const [windper,setWindper]=useState(0)


  const WeatherConditon={
    "01n":SunIcon,
    "01d":MoonIcon,
    "02n":CloudIcon,
    "02d":MoonCloudIcon,
    "03n":BrokenIcon,
    "03d":CloudIcon,
    "04n":MoonCloudIcon,
    "04d":CloudIcon,
    "09n":RainIcon,
    "09d":DrizzleIcon,
    "010n":RainIcon,
    "010d":RainIcon,
    "013n":SnowIcon,
    "013d":SnowIcon,
    "011n":ThunderIcon,
    "011d":ThunderIcon,
    "050n":MistIcon,
    "050d":MistIcon,

  }

   const search= async ()=>{
    setLoading(true)
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res=await fetch(url);
      let data=await res.json();
      console.log(data)
      if(data.cod=="404"){
        console.log("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumper(data.main.humidity);
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLot(data.coord.lon);
      setTemp(Math.floor(data.main.temp));
      setWindper(data.wind.speed);

      const WeatherCode=data.weather[0].icon;
      setIcon(WeatherConditon[WeatherCode] || SunIcon);
      setCityNotFound(false);

    }catch(error){
      console.log(error.message);
      setError("An error ocuur while fetching weather data.")
    }finally{
        setLoading(false)
    }
   }



const Handlecity=(event)=>{
  setText(event.target.value)
}
const Enter=(event)=>{
  if(event.key=="Enter"){
    search()
  }
}

useEffect (function () {
  search();

},[]);
 
  

  return (
    <>
      <div className="container">
        <div className="input-container">
          <div className="input">
            <input type="text" placeholder="Search City..." onChange={Handlecity} className="Search" value={text} onKeyDown={Enter} />
          </div>
          <div className="search-icon" onClick={()=>{
            search()
          }}>
            <img src={SearchIcon} alt="Search" />
          </div>
        </div>
        {!loading && ! cityNotFound && <Sun icon={icon} temp={temp} city={city} country={country} lat={lat} lot={lot} hum={hum} humper={humper} wind={wind} windper={windper}/>}
       {loading && <div className="loading-msg">Loading...</div>}
       {error && <div className="eror-msg">{error}</div>}
       {cityNotFound && <div className="city-not-found">City Not Found</div>}

      </div>
         
      
        
    </>
  )
}

 export default App

