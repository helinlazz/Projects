import React, { useState, useEffect } from 'react'
import { TiWeatherWindy } from 'react-icons/ti'
import { BsSearch } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'
import { AiFillCloud } from 'react-icons/ai'

import WeatherCSS from './Weather.module.css'
import WeatherIcon from './WeatherIcon'

const Weather = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState('')
  const [citySuggestions, setCitySuggestions] = useState([])

  useEffect(() => {
    async function fetchCitySuggestions() {
      try {
        const apiKey = '823518edc4bac84c6f01daee967901fb'
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
        )
        const data = await response.json()
        setCitySuggestions(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (city.trim() !== '') {
      fetchCitySuggestions()
    } else {
      setCitySuggestions([])
    }
  }, [city])

  async function changeCity(selectedCity) {
    try {
      const apiKey = '823518edc4bac84c6f01daee967901fb'
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`
      )
      const data = await response.json()
      setWeatherData(data)
      setCity(selectedCity)
      setCitySuggestions([]) // Chiudi la lista dei suggerimenti quando viene selezionata una città
      updateBodyBackground(data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateBodyBackground = (data) => {
    if (data) {
      const weather = data.weather[0].main.toLowerCase()

      switch (weather) {
        case 'rain':
          document.body.className = WeatherCSS.rainBackground
          break
        case 'clear':
          document.body.className = WeatherCSS.clearBackground
          break
        case 'snow':
          document.body.className = WeatherCSS.snowBackground
          break
        case 'mist':
          document.body.className = WeatherCSS.mistBackground
          break
        case 'clouds':
          document.body.className = WeatherCSS.cloudsBackground
          break
        case 'fewclouds':
          document.body.className = WeatherCSS.fewCloudsBackground
          break
        default:
          document.body.className = WeatherCSS.defaultBackground
      }
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchCityByCoordinates(latitude, longitude)
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }

  const fetchCityByCoordinates = async (latitude, longitude) => {
    try {
      const apiKey = '823518edc4bac84c6f01daee967901fb'
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
      const data = await response.json()
      setWeatherData(data)
      setCity(`${data.name}, ${data.sys.country}`)
      updateBodyBackground(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={WeatherCSS.weatherBlock}>
      <div className={WeatherCSS.cityInput}>
        <FaLocationDot
          className={WeatherCSS.locationIcon}
          onClick={getLocation}
        />

        <input
          list='cities'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter city...'
        />

        <button onClick={() => changeCity(city)}>
          <BsSearch />
        </button>

        <datalist id='cities'>
          {citySuggestions.map((suggestion) => (
            <option
              key={suggestion.name}
              value={`${suggestion.name}, ${suggestion.country}`}
            />
          ))}
        </datalist>
      </div>

      {weatherData ? (
        <>
          <div className={WeatherCSS.cityName}>
            <h2>{weatherData.name}</h2>
          </div>

          <div className={WeatherCSS.weatherIcon}>
            <WeatherIcon weatherData={weatherData} />
            <p>{weatherData.weather[0].description.toUpperCase()}</p>
          </div>

          <div className={WeatherCSS.weatherInfoBlock}>
            <h1> {(weatherData.main.temp - 273).toFixed(0)}°C</h1>

            <div className={WeatherCSS.weatherInfo}>
              <p>
                <TiWeatherWindy />
                Wind: {weatherData.wind.speed.toFixed(0)} m/s
              </p>

              <p>
                <AiFillCloud />
                Cloudy: {weatherData.clouds.all}%
              </p>
            </div>
          </div>
        </>
      ) : (
        <h1>Choose the City</h1>
      )}
    </div>
  )
}

export default Weather
