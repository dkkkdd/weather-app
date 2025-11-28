import './Humidity.css'

export const Humidity = ({ data }) => {
  if (!data) return null

  return (
    <div className="humidity-card card">
      <h4>Влажность</h4>

      <div className="card-content humidity-content">
        <div className="humidity-value">{data.humidity}%</div>
        <p className="humidity-desc">
          {data.humidity < 40
            ? 'Сухой воздух'
            : data.humidity < 60
              ? 'Комфортно'
              : data.humidity < 80
                ? 'Влажно'
                : 'Очень влажно'}
        </p>
      </div>
    </div>
  )
}
