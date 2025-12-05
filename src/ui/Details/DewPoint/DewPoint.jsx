import './DewPoint.css'

export const DewPoint = ({ data, unit }) => {
  if (!data) return null
  function description() {
    if (unit === 'C') {
      const v = data.dewpoint_c
      if (v < 5) return 'Сухо'
      if (v < 12) return 'Комфортно'
      if (v < 18) return 'Умеренная сырость'
      return 'Очень влажно'
    } else {
      const v = data.dewpoint_f
      if (v < 41) return 'Сухо'
      if (v < 54) return 'Комфортно'
      if (v < 64) return 'Умеренная сырость'
      return 'Очень влажно'
    }
  }

  return (
    <div className="dew-card card ">
      <h4>Точка росы</h4>

      <div className="card-content dew-content">
        <div className="dew-value">
          {unit === 'C' ? Math.round(data.dewpoint_c) : Math.round(data.dewpoint_f)}°
        </div>
        <p className="dew-desc">{description()}</p>
      </div>
    </div>
  )
}
