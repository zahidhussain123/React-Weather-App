import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

const Weather = () => {
  const APIKEY = "6c02b0b3b61f75d58cd26bab8faddc4b";
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const [weather, setWeather] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if (name === "city") {
      setForm({
        ...form,
        city: value,
      });
    }

    if (name === "country") {
      setForm({
        ...form,
        country: value,
      });
    }
  };

  // console.log(form.city,form.country)

  const weatherSubmit = async (e) => {
    e.preventDefault();
    if (form === "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => setWeather({
          data:data
        
        }));
      console.log(data);
    }

 
  };

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={handleChange}
        />
        <button onClick={weatherSubmit} className="geteather">
          Submit
        </button>
      </form>
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
