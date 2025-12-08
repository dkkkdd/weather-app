import { weatherClient } from '../api/weather'

export const ForecastService = {
  async getForecast(city, days = 7) {
    const raw = await weatherClient.request('forecast.json', {
      q: city,
      days,
      lang: 'ru',
    })

    return {
      location: {
        name: raw.location.name,
        country: raw.location.country,
      },
      days: raw.forecast.forecastday.map((day) => ({
        date: day.date,
        temp: {
          min_c: day.day.mintemp_c,
          max_c: day.day.maxtemp_c,
          avg_c: day.day.avgtemp_c,
          min_f: day.day.mintemp_f,
          max_f: day.day.maxtemp_f,
          avg_f: day.day.avgtemp_f,
        },
        condition: {
          text: day.day.condition.text,
          icon: day.day.condition.icon,
        },
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        moonrise: day.astro.moonrise,
        moonset: day.astro.moonset,
        rainChance: day.day.daily_chance_of_rain,
        hours: day.hour.map((h) => ({
          time: h.time,
          temp_c: h.temp_c,
          temp_f: h.temp_f,
          condition: h.condition.text,
          icon: h.condition.icon,
        })),
      })),
    }
  },
}
