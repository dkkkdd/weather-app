import { useCitiesStore } from '../../stores/weatherStore'
import './Aside.css'

export const AsideBar = ({ setActiveCity, setOpenBurger }) => {
  const cities = useCitiesStore((state) => state.cities)
  const removeCity = useCitiesStore((state) => state.removeCity)
  const { activeCity } = useCitiesStore()

  return (
    <div className="bar">
      <h2>Последние 10 городов</h2>

      {cities.map((c) => (
        <div
          key={c.key}
          className={`aside-city ${activeCity === c.key ? 'active' : ''}`}
          onClick={() => {
            setActiveCity(c.key)
            if (window.innerWidth < 1200) {
              setOpenBurger(false)
            }
          }}
        >
          {c.label}

          {c.key !== 'auto:ip' && (
            <span
              className="delete-city-btn"
              onClick={(e) => {
                e.stopPropagation()
                removeCity(c.key)
                if (window.innerWidth < 1200) {
                  setOpenBurger(false)
                }
              }}
            >
              x
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
