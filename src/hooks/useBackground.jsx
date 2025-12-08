const bgImageCache = new Map()

import { useState, useEffect } from 'react'
import { findBackground } from '../utils/findBackground'

export const useBackground = ({ currentWeather }) => {
  const [backgrounds, setBackgrounds] = useState(null)
  const [bgImage, setBgImage] = useState(null)

  // ---------- Загружаем JSON (кэшируется браузером) ----------
  useEffect(() => {
    if (backgrounds) return

    fetch(`${import.meta.env.BASE_URL}condition.json`)
      .then((res) => res.json())
      .then(setBackgrounds)
      .catch(() => {})
  }, [])

  // ---------- Находим нужный путь ----------
  useEffect(() => {
    if (!currentWeather || !backgrounds) return

    const path = findBackground(currentWeather.condition.text, backgrounds, currentWeather.isDay)

    if (!path) return

    const fullUrl = `${import.meta.env.BASE_URL}${path}`

    // мгновенно, если уже есть в кэше
    if (bgImageCache.has(fullUrl)) {
      setBgImage(fullUrl)
      return
    }

    // грузим картинку лениво, без лагов UI
    const load = () => {
      const img = new Image()
      img.src = fullUrl

      img.onload = () => {
        bgImageCache.set(fullUrl, true)
        setBgImage(fullUrl)
      }
    }

    // если доступен requestIdleCallback → идеальный вариант
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(load, { timeout: 500 })
    } else {
      setTimeout(load, 100)
    }
  }, [currentWeather, backgrounds])

  // ---------- Плавный переход ----------
  useEffect(() => {
    if (!bgImage) return

    const root = document.querySelector('#root')
    if (!root) return

    root.style.setProperty('--bg-next', `url(${bgImage})`)

    root.classList.add('bg-fade')

    setTimeout(() => {
      root.style.backgroundImage = `url(${bgImage})`
      root.classList.remove('bg-fade')
    }, 300)
  }, [bgImage])

  return bgImage
}
