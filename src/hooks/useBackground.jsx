import { useState, useEffect } from 'react'
import { findBackground } from '../utils/findBackground'

export const useBackground = ({ currentWeather }) => {
  const [backgrounds, setBackgrounds] = useState({})
  const [bgImage, setBgImage] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}condition.json?v=${Date.now()}`)
      .then((res) => res.json())
      .then(setBackgrounds)
  }, [])

  useEffect(() => {
    if (!currentWeather || !Object.keys(backgrounds).length) return

    const img = findBackground(currentWeather.condition, backgrounds, currentWeather.isDay)
    setBgImage(`${import.meta.env.BASE_URL}${img}`)
  }, [currentWeather, backgrounds])

  // useEffect(() => {
  //   if (!bgImage) return
  //   document.querySelector('#root').style.backgroundImage = `url(${bgImage})`
  // }, [bgImage])
  useEffect(() => {
    if (!bgImage) return

    const root = document.querySelector('#root')
    root.classList.remove('show')

    // плавный переход
    setTimeout(() => {
      root.style.backgroundImage = `url(${bgImage})`
      root.classList.add('show')
    }, 50)
  }, [bgImage])

  return bgImage
}
