import { useState, useRef, useEffect } from 'react'
import { useWeather } from './hooks/useWeather'
import { CurrentWeather } from './ui/CurrentWeather/CurrentWeather'
import { Forecast } from './ui/Forecast/Forecast'
import { MoonSun } from './ui/moonSun/moonSun.jsx'
import { SearchField } from './ui/SearchField/SearchField'
import { ListOfHints } from './ui/ListOfHints/ListOfHints'
import { Hours } from './ui/Hours/Hours.jsx'
import { Wind } from './ui/Wind/Wind.jsx'
import { Visibility } from './ui/Visibility/Visibility.jsx'
import { Humidity } from './ui/Humidity/Humidity.jsx'
import { Pressure } from './ui/Pressure/Prussure.jsx'
import { UVIndex } from './ui/UVIndex/UVIndex.jsx'
import { Precipitation } from './ui/Precipitation/Precipitation.jsx'
import { DewPoint } from './ui/DewPoint/DewPoint.jsx'
import backgrounds from '../public/condition.json'

export default function App() {
  const [bgImage, setBgImage] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [showHints, setShowHints] = useState(false)
  const searchBlockRef = useRef(null)

  const { currentWeather, forecastData, searchHints, searchHintsByName, loadWeather } = useWeather()

  // === Load last city or use auto:ip ===
  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity')

    if (lastCity) {
      setSearchValue(lastCity)
      loadWeather(lastCity)
    } else {
      loadWeather('auto:ip')
    }
  }, [])

  // === Background change ===
  useEffect(() => {
    if (currentWeather) {
      const condition = currentWeather.condition
      const img = backgrounds[condition] || backgrounds['Солнечно']
      setBgImage(img)
    }
  }, [currentWeather])

  useEffect(() => {
    if (bgImage) {
      const root = document.querySelector('#root')
      root.style.backgroundImage = `url(${bgImage})`
    }
  }, [bgImage])

  // === Close hints on outside click ===
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchBlockRef.current && !searchBlockRef.current.contains(e.target)) {
        setShowHints(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // === Search ===
  async function handleSearch() {
    if (!searchValue.trim()) return

    localStorage.setItem('lastCity', searchValue)

    await loadWeather(searchValue)
    setShowHints(false)
  }

  const today = forecastData?.forecast[0]

  return (
    <div className="app">
      <div className="search-block" ref={searchBlockRef}>
        <SearchField
          value={searchValue}
          onChange={async (value) => {
            setSearchValue(value)
            setTimeout(async () => {
              await searchHintsByName(value)
              setShowHints(true)
            }, 500)
          }}
          onSearch={handleSearch}
        />

        {showHints && searchHints.length > 0 && (
          <ListOfHints
            value={searchHints}
            onClick={async (cityName) => {
              setSearchValue(cityName)
              localStorage.setItem('lastCity', cityName)
              await loadWeather(cityName)
              setShowHints(false)
            }}
          />
        )}
      </div>

      {currentWeather && <CurrentWeather weather={currentWeather} />}
      {forecastData && (
        <>
          <Hours data={today} nextDay={forecastData.forecast[1].hours} />
          <Forecast weather={forecastData} />
          <MoonSun data={today} />
          <div className="details">
            <Wind data={today} />
            <Visibility data={today} />
            <Humidity data={today} />
            <Pressure data={today} />
            <UVIndex data={today} />
            <Precipitation data={today} />
            <DewPoint data={today} />
          </div>
        </>
      )}
    </div>
  )
}
