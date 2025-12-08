const memoryCache = new Map()

export function setCache(key, data, ttlMs) {
  const expires = Date.now() + ttlMs
  const payload = { data, expires }

  memoryCache.set(key, payload)
  localStorage.setItem(key, JSON.stringify(payload))
}

export function getCache(key) {
  // 1) проверяем память
  const fromMemory = memoryCache.get(key)
  if (fromMemory && fromMemory.expires > Date.now()) {
    return fromMemory.data
  }

  // 2) проверяем localStorage
  const raw = localStorage.getItem(key)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    if (parsed.expires > Date.now()) {
      memoryCache.set(key, parsed)
      return parsed.data
    }
  } catch (_) {
    return null
  }

  return null
}
