import { Wind } from './Details/Wind/WindBlock/Wind.jsx'
import { Visibility } from './Details/Visibility/Visibility.jsx'
import { Humidity } from './Details/Humidity/Humidity.jsx'
import { Pressure } from './Details/Pressure/Prussure.jsx'
import { UVIndex } from './Details/UVIndex/UVIndex.jsx'
import { Precipitation } from './Details/Precipitation/Precipitation.jsx'
import { DewPoint } from './Details/DewPoint/DewPoint.jsx'

export const Details = ({ today, unit }) => {
  return (
    <div className="details">
      <Wind data={today} />
      <Visibility data={today} />
      <Humidity data={today} />
      <Pressure data={today} />
      <UVIndex data={today} />
      <Precipitation data={today} />
      <DewPoint data={today} unit={unit} />
    </div>
  )
}
