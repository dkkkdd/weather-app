import './DewPoint.css'

export const DewPoint = ({ data, unit }) => {
  if (!data) return null
  const dewp = unit === 'C' ? data.dewpoint.c : data.dewpoint.f
  function description() {
    if (unit === 'C') {
      if (dewp < 5) return 'Сухо'
      if (dewp < 12) return 'Комфортно'
      if (dewp < 18) return 'Умеренная сырость'
      return 'Очень влажно'
    } else {
      if (dewp < 41) return 'Сухо'
      if (dewp < 54) return 'Комфортно'
      if (dewp < 64) return 'Умеренная сырость'
      return 'Очень влажно'
    }
  }

  return (
    <div className="dew-card card ">
      <h4>Точка росы</h4>

      <div className="card-content dew-content">
        <div className="dew-value">{Math.round(dewp)}°</div>
        <p className="dew-desc">{description()}</p>
      </div>
    </div>
  )
}
