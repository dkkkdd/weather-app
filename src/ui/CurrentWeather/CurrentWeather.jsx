import './CurrentWeather.css'

export const CurrentWeather = ({ weather }) => {
  return (
    <div className="current-weather">
      <h3>{weather.country}</h3>
      <h2>{weather.name}</h2>
      <h1>{Math.round(weather.temp)}°</h1>

      <div className="condition">
        <img src={weather.icon} alt={weather.condition} />
        <p>{weather.condition}</p>
      </div>

      <p>
        {Math.round(weather.feelsLike) === Math.round(weather.temp)
          ? 'Совпадает с реальной температурой'
          : `Ощущается как: ${Math.round(weather.feelsLike)}°C`}
      </p>
    </div>
  )
}
