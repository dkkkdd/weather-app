import './moonSun.css'

export const MoonSun = ({ data }) => {
  return (
    <div className=" card">
      <h4>Этапы солнца/луны</h4>
      <div className="card-content moon-sun">
        <div className="moon-sun-item">
          <h3>Восход солнца</h3>
          <p>{data.sunrise}</p>
        </div>
        <div className="moon-sun-item">
          <h3>Закат солнца</h3>
          <p>{data.sunset}</p>
        </div>
        <div className="moon-sun-item">
          <h3>Восход луны</h3>
          <p>{data.moonrise}</p>
        </div>
        <div className="moon-sun-item">
          <h3>Закат луны</h3>
          <p>{data.moonset}</p>
        </div>
      </div>
    </div>
  )
}
