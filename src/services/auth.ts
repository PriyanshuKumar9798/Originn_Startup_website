import { httpJson } from './http'
import { ENDPOINTS } from '../config/env'

export type LoginPayload = {
  founder_email: string
  password: string
}

export type LoginResponse = {
  token?: string
  message?: string
  [key: string]: unknown
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
}


