import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import AuthPage from './components/auth/AuthPage'
import Dashboard from './pages/dashboard/Dashboard'
import Monitor from './pages/monitor/Monitor'
import Optimize from './pages/optimize/Optimize'
import Profile from './pages/profile/Profile'
import Settings from './pages/settings/Settings'
import Diagnose from './pages/diagnose/Diagnose'
import DigitalPresenceManagement from './pages/digital-presence/DigitalPresenceManagement'

// Main App Content
function AppContent() {
  const { user, loading } = useAuth()

  console.log('🏠 [App] Rendering AppContent:', {
    hasUser: !!user,
    userEmail: user?.email,
    userId: user?.id,
    isLoading: loading,
    demoMode: process.env.REACT_APP_DEMO_MODE,
    supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
    timestamp: new Date().toISOString()
  })

  // Show loading state
  if (loading) {
    console.log('⏳ [App] Showing loading state')
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Vizup Platform...</p>
        </div>
      </div>
    )
  }

  // Show auth page if not authenticated
  if (!user) {
    console.log('🔐 [App] No user found, showing AuthPage')
    return <AuthPage />
  }

  // Show main application if authenticated
  console.log('✅ [App] User authenticated, showing main app with dashboard')
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/optimize" element={<Optimize />} />
        <Route path="/digital-presence" element={<DigitalPresenceManagement />} />
        <Route path="/attribute" element={<ModulePlaceholder title="Attribute" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

// Temporary placeholder for dashboard (will be replaced in next milestone)
// Dashboard is implemented; placeholder removed

// Temporary placeholder for modules
function ModulePlaceholder({ title }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {title} Module
        </h1>
        <p className="text-gray-600">Coming in upcoming milestones...</p>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
