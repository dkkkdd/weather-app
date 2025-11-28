import './DewPoint.css'

export const DewPoint = ({ data }) => {
  if (!data) return null

  return (
    <div className="dew-card card">
      <h4>Точка росы</h4>

      <div className="card-content dew-content">
        <div className="dew-value">{data.dewpoint}°</div>
        <p className="dew-desc">
          {data.dewpoint < 5
            ? 'Сухо'
            : data.dewpoint < 12
              ? 'Комфортно'
              : data.dewpoint < 18
                ? 'Умеренная сырость'
                : 'Очень влажно'}
        </p>
      </div>
    </div>
  )
}
