import { useState, useEffect } from 'react'
import { useWeather } from './hooks/useWeather'

import { Effects } from './ui/Effects.jsx'
import { CurrentWeather } from './ui/CurrentWeather/Default/CurrentWeather.jsx'
import { Forecast } from './ui/Forecast/Forecast.jsx'
import { MoonSun } from './ui/Details/MoonSun/MoonSun.jsx'
import { Hours } from './ui/Hours/Hours.jsx'
import { ChangeUnit } from './utils/ChangeUnit.jsx'
import { SearchPanel } from './ui/SearchPanel.jsx'
import { Details } from './ui/Details.jsx'

import { useBackground } from './hooks/useBackground.jsx'

import { useCitiesStore } from './stores/weatherStore.js'
import { CitySwiper } from './ui/CitySwiper.jsx'
import { CityDots } from './ui/CityDots.jsx'
import { BurgerBtn } from './ui/BurgerBtn/BurgerBtn.jsx'
import { AsideBar } from './ui/Aside/Aside.jsx'

export default function App() {
  const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'C')
  const [ready, setReady] = useState(false)
  const [openBurger, setOpenBurger] = useState(false)

  const { activeCity, setActiveCity } = useCitiesStore()

  const {
    current: currentWeather,
    forecast: forecastData,
    error,
    hints,
    searchHints,
    loadWeather,
  } = useWeather()

  useEffect(() => {
    localStorage.setItem('unit', unit)
  }, [unit])

  async function loadWithLoader(city) {
    setReady(false)

    await loadWeather(city)
    await new Promise((r) => setTimeout(r, 50))

    setReady(true)
  }

  useEffect(() => {
    const city = activeCity || 'auto:ip'
    loadWithLoader(city)
  }, [activeCity])

  useBackground({ currentWeather })

  // Новый today
  const today = forecastData?.days?.[0]
  const nextDay = forecastData?.days?.[1]

  return (
    <>
      <Effects className={`fade-screen ${ready ? 'show' : ''}`} currentWeather={currentWeather} />
      <BurgerBtn openBurger={openBurger} setOpenBurger={setOpenBurger} />

      <main className={`layout ${openBurger ? 'menu-open' : ''}`}>
        <aside className="sidebar">
          <SearchPanel
            searchHints={hints}
            searchHintsByName={searchHints}
            loadWeather={loadWeather}
            currentWeather={currentWeather}
            setOpenBurger={setOpenBurger}
          />
          <ChangeUnit unit={unit} setUnit={setUnit} />
          <AsideBar setActiveCity={setActiveCity} setOpenBurger={setOpenBurger} />
        </aside>

        <section className="content-wrapper">
          <CityDots />

          <div className="swiper-container-fixed">
            <CitySwiper>
              <div className="page-scroll">
                <div className={`fade-screen ${ready ? 'show' : ''}`}>
                  {error && <div className="error-block">{error}</div>}

                  {currentWeather && <CurrentWeather weather={currentWeather} unit={unit} />}

                  <div className="app">
                    {forecastData && today && (
                      <>
                        <div className="main-weather">
                          <Hours day={today} nextDay={nextDay} unit={unit} />
                          <Forecast forecast={forecastData} unit={unit} />
                          <MoonSun data={today} />
                        </div>

                        <Details today={currentWeather} unit={unit} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CitySwiper>
          </div>
        </section>
      </main>
    </>
  )
}
