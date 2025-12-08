import { useEffect, useRef, useState } from 'react'
import { useCitiesStore } from '../../../stores/weatherStore'
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

  const temp = unit === 'C' ? weather.temp.c : weather.temp.f

  const feels = unit === 'C' ? weather.temp.feels_c : weather.temp.feels_f

  return (
    <>
      <div ref={bigRef} className="current-weather-big">
        <h3>{weather.country}</h3>
        <h2>{weather.name}</h2>

        <h1>{Math.round(temp)}°</h1>

        <div className="condition">
          <img src={weather.condition.icon} alt={weather.condition.text} />
          <p>{weather.condition.text}</p>
        </div>

        <p className="feels">
          {Math.round(temp) === Math.round(feels)
            ? 'Совпадает с реальной температурой'
            : `Ощущается как: ${Math.round(feels)}°${unit}`}
        </p>
      </div>

      {!isVisible && <CurrentWeatherMini weather={weather} unit={unit} />}
    </>
  )
}
