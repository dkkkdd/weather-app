import { weatherClient } from '../api/weather'

export const SearchService = {
  async search(query) {
    if (!query.trim()) return []

    const raw = await weatherClient.request('search.json', {
      q: query,
      lang: 'ru',
    })

    return raw.map((item) => ({
      id: item.id,
      label: `${item.name}, ${item.country}`,
      key: item.name.toLowerCase().replace(/\s+/g, '-'),
    }))
  },
}
