import { useState, useEffect, createContext, useContext } from 'react'
import { auth, profiles, DEMO_MODE } from '../utils/supabase'

// Create Auth Context
const AuthContext = createContext()

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { session } = await auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.log('Auth initialization failed:', error.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Clear any previous errors on successful auth
        if (session?.user) {
          setError(null)
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  // Sign up function
  const signUp = async (email, password) => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await auth.signUp(email, password)
      
      if (error) {
        setError(error.message)
        return { success: false, error: error.message }
      }
      
      return { success: true, data }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Sign in function
  const signIn = async (email, password) => {
    setLoading(true)
    setError(null)
    
    try {
      // Optional demo mode
      if (DEMO_MODE && email === 'demo@vizup.com' && password === 'demo123') {
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Create mock user
        const mockUser = {
          id: 'demo-user-123',
          email: 'demo@vizup.com',
          user_metadata: {
            full_name: 'Demo User'
          }
        }
        
        setUser(mockUser)
        return { success: true, data: { user: mockUser } }
      }
      
      const { data, error } = await auth.signIn(email, password)
      
      if (error) {
        setError(error.message)
        return { success: false, error: error.message }
      }
      // Ensure profile row exists
      if (data?.user) await profiles.ensureProfile(data.user)
      return { success: true, data }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    setLoading(true)
    setError(null)
    
    try {
      await auth.signOut()
      setUser(null)
      return { success: true }
    } catch (error) {
      const errorMessage = error.message || 'Sign out failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Clear error function
  const clearError = () => setError(null)

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    clearError,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// Protected Route component
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Return auth component instead of redirecting
    return null // Will be handled by main App component
  }

  return children
}
