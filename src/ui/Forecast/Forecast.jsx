import './Forecast.css'
import { formatDate } from '../../utils/formatDate'

export const Forecast = ({ weather, unit }) => {
  return (
    <div className="forecast">
      <div className="forecast-cards">
        {weather.forecast.map((item) => (
          <div key={item.date} className="forecast-card">
            <h3>{formatDate(item.date)}</h3>
            <div className="weather-icon">
              <img src={item.icon} alt={item.condition} className="forecast-icon" />
              <p>{item.will_it_rain === 1 ? item.daily_chance_of_rain + '%' : ''}</p>
            </div>
            <div className="temp-info">
              {unit === 'C' ? Math.round(item.minTemp_c) : Math.round(item.minTemp_f)}°
              <input
                type="range"
                name="temperature"
                id="temperature"
                min={unit === 'C' ? item.minTemp_c : item.minTemp_f}
                max={unit === 'C' ? item.maxTemp_c : item.maxTemp_f}
                value={unit === 'C' ? item.avgTemp_c : item.avgTemp_f}
                disabled
              />
              {unit === 'C' ? Math.round(item.maxTemp_c) : Math.round(item.maxTemp_f)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
