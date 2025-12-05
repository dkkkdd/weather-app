import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useCitiesStore } from '../stores/weatherStore'
import { useRef, useEffect } from 'react'

export function CitySwiper({ children }) {
  const { cities, activeCity, setActiveCity } = useCitiesStore()
  const swiperRef = useRef(null)

  const index = cities.findIndex((c) => c.key === activeCity)
  const initialIndex = index >= 0 ? index : 0

  useEffect(() => {
    const sw = swiperRef.current
    if (!sw) return

    const correctIndex = cities.findIndex((c) => c.key === activeCity)
    if (correctIndex >= 0 && sw.activeIndex !== correctIndex) {
      sw.slideTo(correctIndex, 0)
    }
  }, [cities, activeCity])

  if (cities.length <= 1) return children

  return (
    <Swiper
      speed={400}
      nested={true}
      onSwiper={(sw) => (swiperRef.current = sw)}
      initialSlide={initialIndex}
      onSlideChangeTransitionEnd={(sw) => {
        const slideIndex = sw.activeIndex

        const { cities, activeCity } = useCitiesStore.getState()

        if (slideIndex >= cities.length) return

        const key = cities[slideIndex].key

        if (key === activeCity) return

        setActiveCity(key)
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {cities.map((city) => (
        <SwiperSlide key={city.key}>{children}</SwiperSlide>
      ))}
    </Swiper>
  )
}
