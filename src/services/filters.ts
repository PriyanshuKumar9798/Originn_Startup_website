import { httpJson } from './http'
import { ENDPOINTS } from '../config/env'

export type FilterOption = { value: string; label: string }

export type FiltersResponse = {
  categories?: { values: FilterOption[]; has_custom?: boolean; custom_field?: string }
  institutes?: { values: FilterOption[]; has_custom?: boolean; custom_field?: string }
  stages?: { values: FilterOption[]; has_custom?: boolean }
  product_types?: { values: FilterOption[]; has_custom?: boolean }
  target_markets?: { values: FilterOption[]; has_custom?: boolean }
}

export const fetchFilters = async (signal?: AbortSignal): Promise<FiltersResponse> => {
  return await httpJson<FiltersResponse>(ENDPOINTS.filters, { method: 'GET', signal })
}



