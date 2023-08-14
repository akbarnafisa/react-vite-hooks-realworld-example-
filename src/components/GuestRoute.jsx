import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks'

function GuestRoute({ children }) {
  const { isAuth } = useAuth()
  if (isAuth) return <Navigate to="/" />

  return children;
}

export default GuestRoute
