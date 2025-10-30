export const API_BASE_URL: string = (import.meta as any).env?.VITE_API_BASE_URL || 'http://51.21.150.36:8000';

export const ENDPOINTS = {
  startupApply: '/api/v1/startup/apply',
  filters: '/api/v1/filters',
  startupLogin: '/api/v1/startup/login',
} as const;


