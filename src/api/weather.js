import { ApiClient } from './client'

export const weatherClient = new ApiClient({
  baseUrl: 'https://api.weatherapi.com/v1',
  key: '525bca0d4fa6445f87e104158250212',
})
