export class ApiClient {
  constructor({ baseUrl, key }) {
    this.base = baseUrl
    this.key = key
  }

  async request(path, params = {}, retries = 2) {
    const url = new URL(`${this.base}/${path}`)

    url.searchParams.set('key', this.key)

    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, v)
      }
    }

    try {
      const res = await fetch(url)

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error?.message || 'Unknown API Error')
      }

      return await res.json()
    } catch (err) {
      // если есть ретраи → пробуем ещё раз
      if (retries > 0) {
        return this.request(path, params, retries - 1)
      }

      // ретраев больше нет → кидаем ошибку
      throw err
    }
  }
}
