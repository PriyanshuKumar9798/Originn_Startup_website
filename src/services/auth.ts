import { httpJson } from './http'
import { ENDPOINTS } from '../config/env'

export type LoginPayload = {
  founder_email: string
  password: string
}

export type LoginResponse = {
  message?: string
  access_token?: string
  token_type?: string
  startup?: {
    id: number
    company_name: string
    founder_email: string
    [key: string]: unknown
  }
}

export const login = async (payload: LoginPayload, signal?: AbortSignal): Promise<LoginResponse> => {
  return await httpJson<LoginResponse>(ENDPOINTS.startupLogin, {
    method: 'POST',
    body: payload,
    signal,
  })
}

export const authStorage = {
  setToken: (token: string) => localStorage.setItem('authToken', token),
  getToken: () => localStorage.getItem('authToken'),
  clear: () => localStorage.removeItem('authToken'),
  setStartup: (startup: unknown) => localStorage.setItem('startupInfo', JSON.stringify(startup)),
  getStartup: <T = any>(): T | null => {
    try { const raw = localStorage.getItem('startupInfo'); return raw ? JSON.parse(raw) as T : null } catch { return null }
  },
  clearAll: () => { localStorage.removeItem('authToken'); localStorage.removeItem('startupInfo') },
}



