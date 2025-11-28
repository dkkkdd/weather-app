import './Pressure.css'

export const Pressure = ({ data }) => {
  if (!data) return null

  return (
    <div className="pressure-card card">
      <h4>Давление</h4>

      <div className="card-content pressure-content">
        <div className="pressure-value">{data.pressure} hPa</div>
        <p className="pressure-desc">
          {data.pressure < 1000 ? 'Низкое' : data.pressure < 1015 ? 'Нормальное' : 'Повышенное'}
        </p>
      </div>
    </div>
  )
}
