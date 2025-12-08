// ui/Effects.jsx
import { useState, useEffect } from 'react'
import RainWithClouds from './WeatherEffects/Rain/Rain.jsx'
import Snow from './WeatherEffects/Snow/Snow.jsx'
import Storm from './WeatherEffects/Storm/Storm.jsx'

export const Effects = ({ currentWeather }) => {
  const [effect, setEffect] = useState(null)

  useEffect(() => {
    if (!currentWeather || !currentWeather.condition) return

    const c = currentWeather.condition.text.toLowerCase()

    if (c.includes('гроз')) setEffect('lightning')
    else if (c.includes('дожд')) setEffect('rain')
    else if (c.includes('снег')) setEffect('snow')
    else if (c.includes('дымка') || c.includes('туман')) setEffect('fog')
    else if (c.includes('облачно') || c.includes('пасмурно')) setEffect('clouds')
    else setEffect(null)
  }, [currentWeather])

  return (
    <>
      <div className={`weather-effects ${effect || ''}`} />

      {effect === 'snow' && <Snow />}
      {effect === 'lightning' && <Storm />}
      {effect === 'rain' && <RainWithClouds lightning={effect === 'lightning'} />}
    </>
  )
}
