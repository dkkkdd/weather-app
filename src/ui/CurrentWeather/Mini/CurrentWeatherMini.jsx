import './CurrentWeatherMini.css'

export const CurrentWeatherMini = ({ weather, unit }) => {
  const temp = unit === 'C' ? weather.temp.c : weather.temp.f

  return (
    <div className="cw-mini">
      <img src={weather.condition.icon} alt={weather.condition.text} />
      <div className="cw-mini-info">
        <span className="cw-mini-city">{weather.name}</span>
        <span className="cw-mini-temp">{Math.round(temp)}°</span>
        <span className="cw-mini-cond">{weather.condition.text}</span>
      </div>
    </div>
  )
}
