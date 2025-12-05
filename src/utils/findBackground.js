export function findBackground(condition, backgrounds, isDay) {
  const text = condition.toLowerCase()
  if (isDay === 1) {
    if (text.includes('солнечно')) return backgrounds['Солнечно']
    if (text.includes('гроз')) return backgrounds['Гроза']
    if (text.includes('дождь')) return backgrounds['Дождь']
    if (text.includes('морось')) return backgrounds['Дождь']
    if (text.includes('снег')) return backgrounds['Снег']
    if (text.includes('дымка')) return backgrounds['Туман']
    if (text.includes('туман')) return backgrounds['Туман']

    if (text.includes('облачно') || text.includes('пасмурно')) return backgrounds['Пасмурно']
  } else {
    if (text.includes('гроз')) return backgrounds['Гроза ночная']
    return backgrounds['Ясно']
  }
}
