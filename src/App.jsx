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

import { Loader } from './ui/Loader/Loader.jsx'
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

  const { currentWeather, forecastData, error, searchHints, searchHintsByName, loadWeather } =
    useWeather()

  useEffect(() => {
    localStorage.setItem('unit', unit)
  }, [unit])

  async function loadWithLoader(city) {
    setReady(false)

    await loadWeather(city)

    // даём фону и эффектам отрендериться
    await new Promise((r) => setTimeout(r, 50))

    setReady(true)
  }

  useEffect(() => {
    const city = activeCity || 'auto:ip'
    loadWithLoader(city)
  }, [activeCity])

  useBackground({ currentWeather })
  const today = forecastData?.forecast[0]

  return (
    <>
      <Effects currentWeather={currentWeather} />
      <BurgerBtn openBurger={openBurger} setOpenBurger={setOpenBurger}></BurgerBtn>
      <main className="layout">
        {openBurger && (
          <aside className="sidebar">
            <SearchPanel
              searchHints={searchHints}
              searchHintsByName={searchHintsByName}
              loadWeather={loadWeather}
              currentWeather={currentWeather}
              setOpenBurger={setOpenBurger}
            />
            <ChangeUnit unit={unit} setUnit={setUnit} />
            <AsideBar setActiveCity={setActiveCity} setOpenBurger={setOpenBurger}></AsideBar>
          </aside>
        )}

        <section className="content-wrapper">
          <CityDots />

          <div className="swiper-container-fixed">
            <CitySwiper>
              <div className="page-scroll">
                <div className={`fade-screen ${ready ? 'show' : ''}`}>
                  {error && <div className="error-block">{error}</div>}

                  {currentWeather && <CurrentWeather weather={currentWeather} unit={unit} />}

                  <div className="app">
                    {forecastData && (
                      <>
                        <div className="main-weather">
                          <Hours
                            data={today}
                            nextDay={forecastData.forecast[1].hours}
                            unit={unit}
                          />
                          <Forecast weather={forecastData} unit={unit} />
                          <MoonSun data={today} />
                        </div>
                        <Details today={today} unit={unit} />
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
