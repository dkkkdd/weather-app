// utils/findBackground.js
export function findBackground(conditionText, backgrounds, isDay) {
  if (!conditionText) return null

  const text = conditionText.toLowerCase()
  const day = Boolean(isDay)

  if (day) {
    if (text.includes('солнечно')) return backgrounds['Солнечно']
    if (text.includes('гроз')) return backgrounds['Гроза']
    if (text.includes('дожд')) return backgrounds['Дождь']
    if (text.includes('морось')) return backgrounds['Дождь']
    if (text.includes('снег')) return backgrounds['Снег']
    if (text.includes('дымка') || text.includes('туман')) return backgrounds['Туман']
    if (text.includes('облачно') || text.includes('пасмурно')) return backgrounds['Пасмурно']
  } else {
    if (text.includes('гроз')) return backgrounds['Гроза ночная']
    return backgrounds['Ясно']
  }

  // запасной вариант
  return backgrounds['Пасмурно'] || null
}
