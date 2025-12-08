import './Forecast.css'
import { formatDate } from '../../utils/formatDate'

export const Forecast = ({ forecast, unit }) => {
  return (
    <div className="forecast">
      <div className="forecast-cards">
        {forecast.days.map((day) => (
          <div key={day.date} className="forecast-card">
            <h3>{formatDate(day.date)}</h3>

            <div className="weather-icon">
              <img src={day.condition.icon} />
              <p>{day.rainChance ? `${day.rainChance}%` : ''}</p>
            </div>

            <div className="temp-info">
              {Math.round(unit === 'C' ? day.temp.min_c : day.temp.min_f)}°
              <input
                type="range"
                disabled
                min={unit === 'C' ? day.temp.min_c : day.temp.min_f}
                max={unit === 'C' ? day.temp.max_c : day.temp.max_f}
                value={unit === 'C' ? day.temp.avg_c : day.temp.avg_f}
              />
              {Math.round(unit === 'C' ? day.temp.max_c : day.temp.max_f)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
