import { WeatherService } from './weatherService.js'
import { ForecastService } from './forecastService.js'
import { SearchService } from './searchService.js'

import { setCache, getCache } from '../utils/cache.js'

export const WeatherAPI = {
  async getCurrent(city) {
    const key = `current_${city}`
    const cached = getCache(key)

    if (cached) return cached

    const data = await WeatherService.getCurrent(city)
    setCache(key, data, 2 * 60 * 1000) // 2 мин
    return data
  },

  async getForecast(city) {
    const key = `forecast_${city}`
    const cached = getCache(key)

    if (cached) return cached

    const data = await ForecastService.getForecast(city)
    setCache(key, data, 30 * 60 * 1000) // 30 мин
    return data
  },

  async search(query) {
    const key = `search_${query}`
    const cached = getCache(key)

    if (cached) return cached

    const data = await SearchService.search(query)
    setCache(key, data, 10 * 1000)
    return data
  },
}
