import { httpJson } from './http'
import { ENDPOINTS } from '../config/env'

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


