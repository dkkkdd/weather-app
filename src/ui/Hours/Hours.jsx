import './Hours.css'

export const Hours = ({ day, nextDay, unit }) => {
  const hours = day.hours
  const nextHours = nextDay.hours

  const parseTime = (t) => new Date(t.replace(' ', 'T'))
  const now = new Date()

  const currentHour = hours.find((h) => parseTime(h.time) >= now) || hours[0]
  const currentIndex = hours.indexOf(currentHour)

  const todayFuture = hours.slice(currentIndex)
  const need = 24 - todayFuture.length
  const nextChunk = nextHours.slice(0, need)

  const all = [currentHour, ...todayFuture.slice(1), ...nextChunk]

  return (
    <div className="hours-container swiper-no-swiping">
      {all.map((h, i) => (
        <div key={h.time} className={`hour-card ${i === 0 ? 'now-card' : ''}`}>
          <p className="hour-time">{i === 0 ? 'Сейчас' : h.time.slice(11, 16)}</p>
          <img src={h.icon} className="hour-icon" />
          <p className="hour-temp">{unit === 'C' ? Math.round(h.temp_c) : Math.round(h.temp_f)}°</p>
        </div>
      ))}
    </div>
  )
}
