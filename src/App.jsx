import { useState } from 'react'

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  if (currentPage === 'dashboard') {
    return (
      <Dashboard
        onLogout={() => setCurrentPage('landing')}
      />
    )
  }

  if (currentPage === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={() => setCurrentPage('admin-dashboard')}
        onBack={() => setCurrentPage('landing')}
      />
    )
  }

  if (currentPage === 'admin-dashboard') {
    return (
      <AdminDashboard
        onLogout={() => setCurrentPage('landing')}
      />
    )
  }

  return (
    <LandingPage
      onLoginSuccess={() => setCurrentPage('dashboard')}
      onAdminLogin={() => setCurrentPage('admin-login')}
    />
  )
}