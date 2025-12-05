import { parseApiError } from '../utils/handleError'
const key = '525bca0d4fa6445f87e104158250212'
export const fetchData = async (city, type) => {
  const base = 'https://api.weatherapi.com/v1'

  const urls = {
    current: `${base}/current.json?key=${key}&q=${city}&lang=ru&aqi=yes`,
    search: `${base}/search.json?key=${key}&q=${city}&lang=ru`,
    forecast: `${base}/forecast.json?key=${key}&q=${city}&days=7&lang=ru`,
  }

  try {
    const res = await fetch(urls[type])

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      const errorMessage = data?.error?.message || ''
      throw new Error(errorMessage)
    }

    return await res.json()
  } catch (err) {
    throw new Error(parseApiError(err, type))
  }
}
