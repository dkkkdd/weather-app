export function convertWindDir(dir) {
  const map = {
    N: 'С',
    NNE: 'ССВ',
    NE: 'СВ',
    ENE: 'ВСВ',
    E: 'В',
    ESE: 'ВЮВ',
    SE: 'ЮВ',
    SSE: 'ССЕ',
    S: 'Ю',
    SSW: 'ЮЮЗ',
    SW: 'ЮЗ',
    WSW: 'ЗЮЗ',
    W: 'З',
    WNW: 'ЗСЗ',
    NW: 'СЗ',
    NNW: 'СCЗ',
  }

  return map[dir] || dir
}
