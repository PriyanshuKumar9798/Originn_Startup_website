import React from 'react'
import { Navigate } from 'react-router-dom'
import { authStorage } from '../services/auth'

type RequireAuthProps = { children: React.ReactElement }

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const token = authStorage.getToken()
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}



