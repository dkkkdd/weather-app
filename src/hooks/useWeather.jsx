import { useState } from 'react'
import { fetchCityWeather } from '../services/weatherService'
import { fetchForecastWeather } from '../services/forecastService'
import { fetchSearchCityWeather } from '../services/searchService'

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [searchHints, setSearchHints] = useState([])
  const [error, setError] = useState(null)
  async function searchHintsByName(name) {
    if (!name.trim()) return setSearchHints([])

    const hints = await fetchSearchCityWeather(name)
    setSearchHints(hints)
  }

  async function loadWeather(city) {
    try {
      const weather = await fetchCityWeather(city)
      const forecast = await fetchForecastWeather(city)

      setCurrentWeather(weather)
      setForecastData(forecast)
    } catch (err) {
      setError(err.message)
    }
  }

  return {
    currentWeather,
    forecastData,
    error,
    searchHints,
    searchHintsByName,
    loadWeather,
  }
}
