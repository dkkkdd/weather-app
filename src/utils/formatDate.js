import { isToday, isTomorrow } from 'date-fns'

const shortDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export const formatDate = (dateStr) => {
  const date = new Date(dateStr)

  if (isToday(date)) return 'сегодня'
  if (isTomorrow(date)) return 'завтра'

  return shortDays[date.getDay()]
}
