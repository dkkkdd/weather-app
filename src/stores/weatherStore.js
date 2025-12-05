import { create } from 'zustand'

export const useCitiesStore = create((set, get) => ({
  // МАССИВ ГОРОДОВ ТЕПЕРЬ ОБЪЕКТЫ, А НЕ СТРОКИ
  cities: (() => {
    const saved = JSON.parse(localStorage.getItem('cities'))
    if (!saved || saved.length === 0) {
      return [{ key: 'auto:ip', label: 'Моя локация' }]
    }
    return saved
  })(),

  activeCity: localStorage.getItem('activeCity') || 'auto:ip',

  addCity: (cityObj) => {
    const { key, label } = cityObj
    const cities = get().cities
    let updated = []

    const exists = cities.some((c) => c.key === key)
    updated = [...cities, { key, label }]
    if (exists) return
    if (cities.length > 9) {
      cities.pop()
      updated = [...cities, { key, label }]
    }

    set({ cities: updated })
    localStorage.setItem('cities', JSON.stringify(updated))
  },

  removeCity: (key) => {
    const cities = get().cities
    const active = get().activeCity

    if (key === 'auto:ip') return

    const index = cities.findIndex((c) => c.key === key)
    let updated = cities.filter((c) => c.key !== key)

    // если всё удалили → остаётся только авто-локация
    if (updated.length === 0) {
      updated = [{ key: 'auto:ip', label: 'Моя локация' }]
      set({ cities: updated, activeCity: 'auto:ip' })
      localStorage.setItem('cities', JSON.stringify(updated))
      localStorage.setItem('activeCity', 'auto:ip')
      return
    }

    // удалили НЕ активный
    if (active !== key) {
      set({ cities: updated })
      localStorage.setItem('cities', JSON.stringify(updated))
      return
    }

    // удалили активный → выбираем новый активный
    let newIndex = index - 1
    if (newIndex < 0) newIndex = 0

    const newActiveKey = updated[newIndex].key

    set({
      cities: updated,
      activeCity: newActiveKey,
    })

    localStorage.setItem('cities', JSON.stringify(updated))
    localStorage.setItem('activeCity', newActiveKey)
  },
  // updateCityLabel: (key, label) => {
  //   const cities = get().cities
  //   const updated = cities.map((c) => (c.key === key ? { ...c, label } : c))

  //   set({ cities: updated })
  //   localStorage.setItem('cities', JSON.stringify(updated))
  // },

  setActiveCity: (key) => {
    set({ activeCity: key })
    localStorage.setItem('activeCity', key)
  },
}))
