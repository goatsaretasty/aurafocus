import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import ErrorBoundary from '../components/ErrorBoundary';

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  console.log('test', userId)

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in')
    }
  }, [isLoaded, userId])

  if (!isLoaded) return 'Loading...'

  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  )
}