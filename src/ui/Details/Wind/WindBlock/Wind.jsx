import { WindCompass } from '../Compass/Compass'
import { convertWindDir } from '../../../../utils/convertWindDir'
import './Wind.css'

export const Wind = ({ data }) => {
  if (!data) return null

  const deg = data.wind.deg
  const dir = data.wind.dir
  const speed = data.wind.kph
  const gust = data.wind.gust_kph

  return (
    <div className="wind-card card">
      <h4>Ветер</h4>

      <div className="card-content wind-content">
        <WindCompass degree={deg} dir={dir} />

        <div className="wind-stats">
          <div className="row">
            <span>Ветер</span>
            <span>{speed} м/с</span>
          </div>

          <div className="row">
            <span>Порывы</span>
            <span>{gust} м/с</span>
          </div>

          <div className="row">
            <span>Направление</span>
            <span>
              {deg}° {convertWindDir(dir)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
