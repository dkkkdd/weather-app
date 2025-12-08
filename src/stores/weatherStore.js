import { create } from 'zustand'

export const useCitiesStore = create((set, get) => ({
  cities: (() => {
    const saved = JSON.parse(localStorage.getItem('cities'))
    return saved?.length ? saved : [{ key: 'auto:ip', label: 'Моя локация' }]
  })(),

  activeCity: localStorage.getItem('activeCity') || 'auto:ip',

  addCity: ({ key, label }) => {
    const cities = get().cities

    // 1 — если город уже есть → ничего не делаем
    if (cities.some((c) => c.key === key)) return

    // 2 — вставляем новый город НАЧАЛО списка (как нормальное "последнее добавленное")
    const updated = [{ key, label }, ...cities]

    // 3 — ограничиваем список 10 городами
    const trimmed = updated.slice(0, 10)

    set({ cities: trimmed })
    localStorage.setItem('cities', JSON.stringify(trimmed))
  },

  removeCity: (key) => {
    const cities = get().cities
    const active = get().activeCity

    if (key === 'auto:ip') return

    const updated = cities.filter((c) => c.key !== key)

    // если список пуст → восстанавливаем авто-локацию
    if (updated.length === 0) {
      const fallback = [{ key: 'auto:ip', label: 'Моя локация' }]
      set({ cities: fallback, activeCity: 'auto:ip' })
      localStorage.setItem('cities', JSON.stringify(fallback))
      localStorage.setItem('activeCity', 'auto:ip')
      return
    }

    // если удалён НЕ активный
    if (active !== key) {
      set({ cities: updated })
      localStorage.setItem('cities', JSON.stringify(updated))
      return
    }

    // удалён активный → выбираем ближайший следующий
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
