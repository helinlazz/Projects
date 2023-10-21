import React from 'react'

import ClearSky from '../assets/icons/ClearSky.png'
import Clouds from '../assets/icons/Clouds.png'
import FewClouds from '../assets/icons/FewClouds.png'
import Rain from '../assets/icons/Rain.png'
import Snow from '../assets/icons/Snow.png'
import Mist from '../assets/icons/Mist.png'

function WeatherIcon({ weatherData }) {
  const weatherIcons = {
    Clear: ClearSky,
    Clouds: Clouds,
    'Few Clouds': FewClouds,
    Rain: Rain,
    Snow: Snow,
    Mist: Mist,
    Fog: Mist,
    Haze: Mist,
  }

  const weatherMain = weatherData.weather[0].main
  const iconSrc = weatherIcons[weatherMain]

  return (
    <div className='weatherIcon'>
      <img src={iconSrc} alt={weatherMain} />
    </div>
  )
}

export default WeatherIcon
