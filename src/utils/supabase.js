import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''
export const IS_CONFIGURED = Boolean(supabaseUrl && supabaseAnonKey)
export const DEMO_MODE = (process.env.REACT_APP_DEMO_MODE || (!IS_CONFIGURED ? 'true' : 'false')).toLowerCase() === 'true'

// Safe client: real when configured, minimal mock when not
export const supabase = IS_CONFIGURED
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signInWithOAuth: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        resetPasswordForEmail: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signInWithOtp: async () => ({ data: null, error: { message: 'Supabase not configured' } })
      },
      from: () => ({
        upsert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: { message: 'Supabase not configured' } })
          })
        })
      })
    }

// Simple Profiles API
export const profiles = {
  ensureProfile: async (user) => {
    if (!user) return { error: null }
    const payload = {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || null,
      avatar_url: user.user_metadata?.avatar_url || null
    }
    const { error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' })
    return { error }
  },
  getProfile: async (id) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  }
}

// Auth helper functions
export const auth = {
  // OAuth
  signInWithProvider: async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Magic link
  sendMagicLink: async (email) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Password reset
  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },
  // Sign up with email and password
  signUp: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      return { data, error }
    } catch (error) {
      return { 
        data: null, 
        error: { message: 'Authentication service not configured. Please set up Supabase credentials.' }
      }
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    } catch (error) {
      return { 
        data: null, 
        error: { message: 'Authentication service not configured. Please set up Supabase credentials.' }
      }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: { message: 'Sign out failed' } }
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      return { session, error }
    } catch (error) {
      return { session: null, error }
    }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    try {
      return supabase.auth.onAuthStateChange(callback)
    } catch (error) {
      console.log('Auth state listener not available')
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
  }
}
