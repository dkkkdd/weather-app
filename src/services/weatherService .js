import { fetchData } from '../api/weather'

export const fetchCityWeather = async (city) => {
  if (!city.trim()) city = 'auto:ip'

  const raw = await fetchData(city, 'current')

  return {
    name: raw.location.name,
    country: raw.location.country,
    temp: raw.current.temp_c,
    feelsLike: raw.current.feelslike_c,
    condition: raw.current.condition.text,
    icon: raw.current.condition.icon,
    wind: raw.current.wind_kph,
    humidity: raw.current.humidity,
  }
}

// function getPosition() {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   })
// }

// async function getCityCoords() {
//   try {
//     const pos = await getPosition()
//     return `${pos.coords.latitude},${pos.coords.longitude}`
//   } catch (err) {
//     throw err
//   }
// }
