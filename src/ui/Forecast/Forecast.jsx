import './Forecast.css'
import { formatDate } from '../../utils/formatDate'

export const Forecast = ({ weather }) => {
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
              {Math.round(item.minTemp)}°
              <input
                type="range"
                name="temperature"
                id="temperature"
                min={item.minTemp}
                max={item.maxTemp}
                defaultValue={item.avgTemp}
                disabled
              />
              {Math.round(item.maxTemp)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
