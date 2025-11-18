const key = 'e17c11c11fdc49578e791920251811'
const lang = navigator.language.split('-')[0]

const errorMessages = {
  current: 'Не вдалося отримати поточну погоду',
  search: 'Помилка пошуку міст',
  forecast: 'Не вдалося отримати прогноз',
}

export const fetchData = async (city, type) => {
  const base = `https://api.weatherapi.com/v1`

  const urls = {
    current: `${base}/current.json?key=${key}&q=${city}&lang=${lang}&aqi=yes`,
    search: `${base}/search.json?key=${key}&q=${city}`,
    forecast: `${base}/forecast.json?key=${key}&q=${city}&days=7&lang=${lang}`,
  }

  const url = urls[type]
  if (!url) throw new Error('Unknown request type')

  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(errorMessages[type])
    return await res.json()
  } catch (err) {
    throw err
  }
}
