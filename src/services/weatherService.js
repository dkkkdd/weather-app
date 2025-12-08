import { weatherClient } from '../api/weather.js'

export const WeatherService = {
  async getCurrent(city) {
    const raw = await weatherClient.request('current.json', {
      q: city,
      lang: 'ru',
      aqi: 'yes',
    })

    return {
      isDay: raw.current.is_day === 1,
      name: raw.location.name,
      country: raw.location.country,
      key: city.toLowerCase().replace(/\s+/g, '-'),
      temp: {
        c: raw.current.temp_c,
        f: raw.current.temp_f,
        feels_c: raw.current.feelslike_c,
        feels_f: raw.current.feelslike_f,
      },
      condition: {
        text: raw.current.condition.text,
        icon: raw.current.condition.icon,
      },
      wind: {
        deg: raw.current.wind_degree,
        dir: raw.current.wind_dir,
        kph: raw.current.wind_kph,
        mph: raw.current.wind_mph,
        gust_kph: raw.current.gust_kph,
      },
      humidity: raw.current.humidity,
      pressure: raw.current.pressure_mb,
      precip_mm: raw.current.precip_mm,
      vis_km: raw.current.vis_km,
      uv: raw.current.uv,
      dewpoint: {
        c: raw.current.dewpoint_c ?? null,
        f: raw.current.dewpoint_f ?? null,
      },
    }
  },
}
