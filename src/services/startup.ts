import { httpJson } from './http'
import { ENDPOINTS } from '../config/env'
import { authStorage } from './auth'

export type ApplyStartupPayload = {
  company_name?: string
  about_startup?: string
  founder_email?: string
  product_description?: string
  founder_name?: string
  stage?: string
  company_website?: string
  pitch_deck_url?: string
  institute_name?: string
  team_members?: number
  address?: string
  password?: string
  confirm_password?: string
}

export type ApplyStartupResponse = {
  id?: string
  message?: string
  [key: string]: unknown
}

export const applyForStartup = async (
  payload: ApplyStartupPayload,
  signal?: AbortSignal
): Promise<ApplyStartupResponse> => {
  return await httpJson<ApplyStartupResponse>(ENDPOINTS.startupApply, {
    method: 'POST',
    body: payload,
    signal,
  })
}

export type StartupDetailResponse = {
  message?: string
  data: {
    id: number
    company_name: string
    about_startup?: string | null
    product_description?: string | null
    founder_email: string
    founder_name?: string | null
    company_website?: string | null
    institute_name?: string | null
    team_members?: number | null
    stage?: string | null
    address?: string | null
    category?: string | null
    product_type?: string | null
    target_market?: string | null
    short_description?: string | null
    [key: string]: unknown
  }
}

export const getStartupById = async (id: number, signal?: AbortSignal): Promise<StartupDetailResponse> => {
  const token = authStorage.getToken()
  return await httpJson<StartupDetailResponse>(`/api/v1/startup/${id}`, {
    method: 'GET',
    headers: token ? { Authorization: `bearer ${token}` } : {},
    signal,
  })
}



