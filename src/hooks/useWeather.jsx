import { useState } from 'react'
import { WeatherAPI } from '../services/index'

export function useWeather() {
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [hints, setHints] = useState([])
  const [error, setError] = useState(null)
  let controller = null

  async function loadWeather(city) {
    try {
      if (controller) controller.abort()
      controller = new AbortController()

      const [c, f] = await Promise.all([WeatherAPI.getCurrent(city), WeatherAPI.getForecast(city)])

      setCurrent(c)
      setForecast(f)
      setError(null)
    } catch (e) {
      if (e.name === 'AbortError') return
      setError(e.message)
    }
  }

  async function searchHints(query) {
    const result = await WeatherAPI.search(query)
    setHints(result)
  }

  return {
    current,
    forecast,
    error,
    hints,
    searchHints,
    loadWeather,
  }
}
