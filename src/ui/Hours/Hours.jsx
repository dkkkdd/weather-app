import './Hours.css'

export const Hours = ({ data, nextDay, unit }) => {
  data = data.hours
  nextDay = Object.values(nextDay)

  const parseTime = (str) => new Date(str.replace(' ', 'T'))
  const now = new Date()

  const currentHour = data.find((h) => parseTime(h.time) >= now) || data[0]
  const currentIndex = data.indexOf(currentHour)

  const todayFuture = data.slice(currentIndex)

  const need = 24 - todayFuture.length
  const nextChunk = nextDay.slice(0, need)

  const allHours = [currentHour, ...todayFuture.slice(1), ...nextChunk]

  return (
    <div className="hours-container swiper-no-swiping">
      <div className="hour-card now-card">
        <p className="hour-time">Сейчас</p>
        <img src={currentHour.icon} className="hour-icon" />
        <p className="hour-temp">
          {unit === 'C' ? Math.round(currentHour.temp_c) : Math.round(currentHour.temp_f)}°
        </p>
      </div>

      {allHours.slice(1).map((hour) => (
        <div key={hour.time} className="hour-card">
          <p className="hour-time">{hour.time.slice(11, 16)}</p>
          <img src={hour.icon} className="hour-icon" />
          <p className="hour-temp">
            {unit === 'C' ? Math.round(hour.temp_c) : Math.round(hour.temp_f)}°
          </p>
        </div>
      ))}
    </div>
  )
}
