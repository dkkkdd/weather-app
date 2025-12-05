import { fetchData } from '../api/weather'

export const fetchCityWeather = async (city) => {
  if (!city.trim()) city = 'auto:ip'

  const raw = await fetchData(city, 'current')

  return {
    isDay: raw.current.is_day,
    key: city,
    name: raw.location.name,
    country: raw.location.country,
    temp_c: raw.current.temp_c,
    temp_f: raw.current.temp_f,
    feelsLike_c: raw.current.feelslike_c,
    feelsLike_f: raw.current.feelslike_f,
    condition: raw.current.condition.text,
    icon: raw.current.condition.icon,
  }
}
