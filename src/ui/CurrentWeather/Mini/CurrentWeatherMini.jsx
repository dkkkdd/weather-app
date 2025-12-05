import './CurrentWeatherMini.css'

export const CurrentWeatherMini = ({ weather, unit }) => {
  return (
    <div className="cw-mini">
      <img src={weather.icon} alt={weather.condition} />
      <div className="cw-mini-info">
        <span className="cw-mini-city">{weather.name}</span>
        <span className="cw-mini-temp">
          {unit === 'C' ? Math.round(weather.temp_c) : Math.round(weather.temp_f)}°
        </span>
        <span className="cw-mini-cond">{weather.condition}</span>
      </div>
    </div>
  )
}
