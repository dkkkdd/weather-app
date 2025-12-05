import { WindCompass } from '../Compass/Compass'
import { convertWindDir } from '../../../../utils/convertWindDir'
import './Wind.css'

export const Wind = ({ data }) => {
  if (!data) return null

  return (
    <div className="wind-card card ">
      <h4>Ветер</h4>

      <div className="card-content wind-content">
        <WindCompass degree={data.wind_degree} dir={data.wind_dir} />

        <div className="wind-stats">
          <div className="row">
            <span>Ветер</span>
            <span>{data.wind_kph} м/с</span>
          </div>

          <div className="row">
            <span>Порывы</span>
            <span>{data.gust_kph} м/с</span>
          </div>

          <div className="row">
            <span>Направление</span>
            <span>
              {data.wind_degree}° {convertWindDir(data.wind_dir)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
