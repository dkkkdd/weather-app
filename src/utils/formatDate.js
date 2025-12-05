import { isToday, isTomorrow } from 'date-fns'

const shortDays = [
  'вс', // 0
  'пн', // 1
  'вт', // 2
  'ср', // 3
  'чт', // 4
  'пт', // 5
  'сб', // 6
]

export const formatDate = (dateStr) => {
  const date = new Date(dateStr)

  if (isToday(date)) return 'сегодня'
  if (isTomorrow(date)) return 'завтра'

  return shortDays[date.getDay()]
}
