import { format, isToday, isTomorrow } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDate = (dateStr) => {
  const date = new Date(dateStr)

  if (isToday(date)) return 'сегодня'
  if (isTomorrow(date)) return 'завтра'

  return format(date, 'E', { locale: ru })
}
