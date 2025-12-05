import { fetchData } from '../api/weather'

export const fetchForecastWeather = async (city) => {
  const raw = await fetchData(city, 'forecast')

  return {
    forecast: raw.forecast.forecastday.map((item) => ({
      date: item.date,
      avgTemp_c: item.day.avgtemp_c,
      avgTemp_f: item.day.avgtemp_f,
      moonRise: item.astro.moonrise,
      moonSet: item.astro.moonset,
      sunRise: item.astro.sunrise,
      sunSet: item.astro.sunset,
      condition: item.day.condition.text,
      icon: item.day.condition.icon,
      rainChance: item.day.daily_chance_of_rain,
      minTemp_c: item.day.mintemp_c,
      minTemp_f: item.day.mintemp_f,
      maxTemp_c: item.day.maxtemp_c,
      maxTemp_f: item.day.maxtemp_f,
      hours: item.hour.map((hour) => ({
        time: hour.time,
        temp_c: hour.temp_c,
        temp_f: hour.temp_f,
        condition: hour.condition.text,
        icon: hour.condition.icon,
      })),
      will_it_rain: item.day.daily_will_it_rain,
      daily_chance_of_rain: item.day.daily_chance_of_rain,
      vis_km: raw.current.vis_km,
      humidity: raw.current.humidity,
      pressure: raw.current.pressure_mb,
      dewpoint_c: raw.current.dewpoint_c,
      dewpoint_f: raw.current.dewpoint_f,
      uv: raw.current.uv,
      precip_mm: raw.current.precip_mm,
      vis_miles: raw.current.vis_miles,
      wind_dir: raw.current.wind_dir,
      wind_degree: raw.current.wind_degree,
      wind_kph: raw.current.wind_kph,
      wind_mph: raw.current.wind_mph,
      gust_kph: raw.current.gust_kph,
      gust_mph: raw.current.gust_mph,
      windchill_c: raw.current.windchill_c,
      windchill_f: raw.current.windchill_f,
    })),
    name: raw.location.name,
    country: raw.location.country,
  }
}
