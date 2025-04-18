import { API_URL } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const fetchWithToken = async (
  url: string,
  options: RequestInit = {},
) => {
  const token = await AsyncStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`)
  }

  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

export const api = {
  get: (url: string, options: RequestInit = {}) =>
    fetchWithToken(url, { ...options, method: 'GET' }),

  post: (url: string, data?: any, options: RequestInit = {}) =>
    fetchWithToken(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: (url: string, data?: any, options: RequestInit = {}) =>
    fetchWithToken(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: (url: string, options: RequestInit = {}) =>
    fetchWithToken(url, { ...options, method: 'DELETE' }),

  patch: (url: string, data?: any, options: RequestInit = {}) =>
    fetchWithToken(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),
}
