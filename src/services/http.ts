import { API_BASE_URL } from '../config/env'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type JsonHeaders = Record<string, string>

const defaultHeaders: JsonHeaders = {
  'Content-Type': 'application/json',
}

export const httpJson = async <TResponse>(
  path: string,
  options: {
    method?: HttpMethod
    headers?: JsonHeaders
    body?: unknown
    signal?: AbortSignal
  } = {}
): Promise<TResponse> => {
  const url = `${API_BASE_URL}${path}`

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...(options.headers || {}) },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
    credentials: 'omit',
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    if (isJson) {
      try {
        const data = await response.json()
        message = (data && (data.detail || data.message || data.error)) || message
      } catch {}
    }
    throw new Error(message)
  }

  if (!isJson) return (undefined as unknown) as TResponse

  return (await response.json()) as TResponse
}


