import { WindCompass } from '../Compass/Compass.jsx'

export const Wind = ({ data }) => {
  if (!data) return null

  return (
    <div className="wind-card card wide">
      <h4>Ветер</h4>

      <div className="card-content">
        <WindCompass degree={data.wind_degree} dir={data.wind_dir} />
        <div className="wind-stats">
          <div className="dir">{data.wind_dir}</div>
          <div className="deg">{data.wind_degree}°</div>
          <div>Скорость: {data.wind_kph} kph</div>
          <div>Порывы: {data.gust_mph} mph</div>
        </div>
      </div>
    </div>
  )
}
