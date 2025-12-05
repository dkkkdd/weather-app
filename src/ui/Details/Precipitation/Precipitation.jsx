import './Pricipitation.css'

export const Precipitation = ({ data }) => {
  if (!data) return null

  return (
    <div className="precip-card card">
      <h4>Осадки</h4>

      <div className="card-content precip-content">
        <div className="precip-value">{data.precip_mm} мм</div>
        <p className="precip-desc">
          {data.rainChance === 0 ? 'Без осадков' : `Вероятность дождя: ${data.rainChance}%`}
        </p>
      </div>
    </div>
  )
}
