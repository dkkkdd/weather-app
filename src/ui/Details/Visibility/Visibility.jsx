import './Visibility.css'

export const Visibility = ({ data }) => {
  if (!data) return null

  const km = Number(data.vis_km)

  const getQuality = () => {
    if (km >= 10) return 'Отличная'
    if (km >= 6) return 'Хорошая'
    if (km >= 2) return 'Плохая'
    return 'Очень плохая'
  }

  const getDescription = () => {
    if (km >= 10) return 'Видимость чистая. Осадков и тумана нет.'
    if (km >= 6) return 'Лёгкая дымка возможна.'
    if (km >= 2) return 'Местами заметная дымка и ухудшение обзора.'
    return 'Сильный туман, движение осложнено.'
  }

  return (
    <div className="visibility card ">
      <h4>Видимость</h4>

      <div className="vis-item card-content">
        <span className="vis-label">Километры</span>
        <span className="vis-number">{km}</span>
        <div className="vis-quality">{getQuality()}</div>
        <div className="vis-description">{getDescription()}</div>
      </div>
    </div>
  )
}
