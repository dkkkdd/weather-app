import { useCitiesStore } from '../stores/weatherStore'
import '../styles/CityDods.css'

export function CityDots() {
  const { cities, activeCity, setActiveCity } = useCitiesStore()
  const index = cities.findIndex((c) => c.key === activeCity)

  if (index === -1 || cities.length <= 1) return null

  return (
    <div className="city-dots">
      {cities.map((c) => (
        <span
          key={c.key}
          className={`dot ${c.key === activeCity ? 'active' : ''}`}
          onClick={() => setActiveCity(c.key)}
        />
      ))}
    </div>
  )
}
