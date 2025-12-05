import { useEffect, useRef, useState } from 'react'
import { useCitiesStore } from '../../../stores/weatherStore' // путь поправь под себя
import './CurrentWeather.css'
import { CurrentWeatherMini } from '../Mini/CurrentWeatherMini'

export const CurrentWeather = ({ weather, unit }) => {
  const bigRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  const { cities, activeCity } = useCitiesStore()
  const activeIndex = cities.findIndex((c) => c.key === activeCity)

  useEffect(() => {
    if (activeIndex < 0) return

    const allScrollEls = document.querySelectorAll('.page-scroll')
    const scrollEl = allScrollEls[activeIndex]
    if (!scrollEl) return

    function onScroll() {
      const offset = scrollEl.scrollTop

      setIsVisible(offset < 120)
    }

    scrollEl.addEventListener('scroll', onScroll)
    onScroll()

    return () => scrollEl.removeEventListener('scroll', onScroll)
  }, [activeIndex])

  return (
    <>
      <div ref={bigRef} className="current-weather-big">
        <h3>{weather.country}</h3>
        <h2>{weather.name}</h2>
        <h1>{unit === 'C' ? Math.round(weather.temp_c) : Math.round(weather.temp_f)}°</h1>

        <div className="condition">
          <img src={weather.icon} alt={weather.condition} />
          <p>{weather.condition}</p>
        </div>

        <p className="feels">
          {Math.round(weather.feelsLike) === Math.round(weather.temp)
            ? 'Совпадает с реальной температурой'
            : `Ощущается как: ${
                unit === 'C' ? Math.round(weather.feelsLike_c) : Math.round(weather.feelsLike_f)
              }°${unit}`}
        </p>
      </div>

      {!isVisible && <CurrentWeatherMini weather={weather} unit={unit} />}
    </>
  )
}
