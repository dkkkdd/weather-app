export const ERROR_MESSAGES = {
  NETWORK: 'Проблема с подключением. Попробуйте позже.',
  UNKNOWN: 'Неизвестная ошибка.',
  CITY_NOT_FOUND: 'Город не найден. Проверьте ввод.',
  API_CURRENT: 'Не удалось получить текущую погоду.',
  API_FORECAST: 'Не удалось получить прогноз.',
  API_SEARCH: 'Ошибка при поиске города.',
  KEY: 'Возникли технические проблемы.',
}

export function parseApiError(err, type) {
  if (err.message === 'Failed to fetch') {
    return ERROR_MESSAGES.NETWORK
  }
  if (err.message === 'key is not defined') {
    return ERROR_MESSAGES.KEY
  }

  if (err.code === 1006 || err.message.includes('No matching location')) {
    return ERROR_MESSAGES.CITY_NOT_FOUND
  }

  const map = {
    current: ERROR_MESSAGES.API_CURRENT,
    forecast: ERROR_MESSAGES.API_FORECAST,
    search: ERROR_MESSAGES.API_SEARCH,
  }

  return map[type] || ERROR_MESSAGES.UNKNOWN
}
