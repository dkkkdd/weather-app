import { create } from 'zustand'

export const useCitiesStore = create((set, get) => ({
  cities: (() => {
    const saved = JSON.parse(localStorage.getItem('cities'))
    return saved?.length ? saved : [{ key: 'auto:ip', label: 'Моя локация' }]
  })(),

  activeCity: localStorage.getItem('activeCity') || 'auto:ip',

  addCity: ({ key, label }) => {
    const cities = get().cities

    if (cities.some((c) => c.key === key)) return

    const updated = [{ key, label }, ...cities]
    const trimmed = updated.slice(0, 10)

    set({ cities: trimmed })
    localStorage.setItem('cities', JSON.stringify(trimmed))
  },

  removeCity: (key) => {
    const cities = get().cities
    const active = get().activeCity

    if (key === 'auto:ip') return

    const updated = cities.filter((c) => c.key !== key)

    if (updated.length === 0) {
      const fallback = [{ key: 'auto:ip', label: 'Моя локация' }]
      set({ cities: fallback, activeCity: 'auto:ip' })
      localStorage.setItem('cities', JSON.stringify(fallback))
      localStorage.setItem('activeCity', 'auto:ip')
      return
    }

    if (active !== key) {
      set({ cities: updated })
      localStorage.setItem('cities', JSON.stringify(updated))
      return
    }

    const nextActive = updated[0].key

    set({
      cities: updated,
      activeCity: nextActive,
    })

    localStorage.setItem('cities', JSON.stringify(updated))
    localStorage.setItem('activeCity', nextActive)
  },

  setActiveCity: (key) => {
    set({ activeCity: key })
    localStorage.setItem('activeCity', key)
  },
}))
