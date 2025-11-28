import { fetchData } from '../api/weather'

export const fetchSearchCityWeather = async (city) => {
  if (!city.trim()) city = 'auto:ip'

  const raw = await fetchData(city, 'search')

  return raw.map((item) => ({
    id: item.id,
    name: item.name,
    country: item.country,
  }))
}
