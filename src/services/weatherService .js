import { findCityWeather } from '../api/weather'

export const fetchCityWeather = async (city) => {
  if (!city.trim()) {
    // throw new Error('City is required')
    city = await getCityCoords()
  }

  const raw = await findCityWeather(city)

  // нормализуем что нужно UI, красиво чистим данные
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

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (err) => reject(err)
    )
  })
}

async function getCityCoords() {
  try {
    const pos = await getPosition()
    return `${pos.coords.latitude},${pos.coords.longitude}`
  } catch (e) {
    console.log('Ошибка:', e.message)
  }
}
