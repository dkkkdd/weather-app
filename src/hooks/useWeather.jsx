import { useState } from 'react'
import { fetchCityWeather } from '../services/weatherService'
import { fetchForecastWeather } from '../services/forecastService'
import { fetchSearchCityWeather } from '../services/searchService'

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [searchHints, setSearchHints] = useState([])

  async function searchHintsByName(name) {
    if (!name.trim()) return setSearchHints([])

    const hints = await fetchSearchCityWeather(name)
    setSearchHints(hints)
  }

  async function loadWeather(city) {
    const weather = await fetchCityWeather(city)
    const forecast = await fetchForecastWeather(city)

    setCurrentWeather(weather)
    setForecastData(forecast)
  }

  return {
    currentWeather,
    forecastData,
    searchHints,
    searchHintsByName,
    loadWeather,
  }
}
