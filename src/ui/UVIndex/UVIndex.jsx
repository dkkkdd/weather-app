import './UVIndex.css'

export const UVIndex = ({ data }) => {
  if (!data) return null

  return (
    <div className="uv-card card">
      <h4>UV индекс</h4>

      <div className="card-content uv-content">
        <div className="uv-value">{data.uv}</div>
        <p className="uv-desc">
          {data.uv < 3 ? 'Низкий' : data.uv < 6 ? 'Средний' : data.uv < 8 ? 'Высокий' : 'Опасный'}
        </p>
      </div>
    </div>
  )
}
