import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { auth } from '../../utils/supabase'
import '../../styles/login.css'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [localError, setLocalError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const { signIn, signUp, loading, error, clearError } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear errors when user starts typing
    if (localError) setLocalError('')
    if (error) clearError()
    if (successMessage) setSuccessMessage('')
  }

  const validateForm = () => {
    if (!formData.email) {
      setLocalError('Email is required')
      return false
    }
    
    if (!formData.email.includes('@')) {
      setLocalError('Please enter a valid email address')
      return false
    }
    
    if (!formData.password) {
      setLocalError('Password is required')
      return false
    }
    
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return false
    }
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('🎯 [AuthPage] Form submitted', { isSignUp, email: formData.email })
    
    setLocalError('')
    setSuccessMessage('')
    
    if (!validateForm()) {
      console.log('❌ [AuthPage] Form validation failed')
      return
    }

    try {
      if (isSignUp) {
        console.log('📝 [AuthPage] Starting signup process...')
        const result = await signUp(formData.email, formData.password)
        
        console.log('📊 [AuthPage] Signup result:', {
          success: result.success,
          autoSignedIn: result.autoSignedIn,
          hasData: !!result.data,
          error: result.error
        })
        
        if (result.success) {
          if (result.autoSignedIn) {
            console.log('🎉 [AuthPage] User auto-signed in! Setting success message...')
            setSuccessMessage('Account created successfully! Redirecting to dashboard...')
            console.log('⏳ [AuthPage] Success message set, waiting for auth state change...')
          } else {
            console.log('📧 [AuthPage] Email verification required')
            setSuccessMessage('Account created! Please check your email for verification.')
            setFormData({ email: '', password: '', confirmPassword: '' })
          }
        } else {
          console.error('❌ [AuthPage] Signup failed:', result.error)
          setLocalError(result.error || 'Failed to create account')
        }
      } else {
        console.log('🔑 [AuthPage] Starting signin process...')
        const result = await signIn(formData.email, formData.password)
        console.log('📊 [AuthPage] Signin result:', result)
        
        if (!result.success) {
          console.error('❌ [AuthPage] Signin failed:', result.error)
          setLocalError(result.error || 'Failed to sign in')
        } else {
          console.log('✅ [AuthPage] Signin successful!')
        }
      }
    } catch (err) {
      console.error('💥 [AuthPage] Unexpected error in handleSubmit:', err)
      setLocalError('An unexpected error occurred. Please try again.')
    }
  }

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp)
    setFormData({ email: '', password: '', confirmPassword: '' })
    setLocalError('')
    setSuccessMessage('')
    clearError()
  }

  const currentError = localError || error

  return (
    <div className="login-page">
      <div className="bg-animation">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>
      <div className="container">
        <div className="branding-section">
          <div className="logo"><div className="logo-icon">V</div><div className="logo-text">VIZUP</div></div>
          <div className="tagline"><span className="pulse-dot"></span>AI is changing how customers discover brands</div>
          <h1 className="hero-title">Lead the AI Visibility Race</h1>
          <p className="hero-description">While competitors struggle to appear in AI answers, smart brands use Answer Engine Marketing to dominate AI platforms. Be first to market in the AI discovery revolution.</p>
          <div className="progress-indicator">
            <div className="progress-label">AI Visibility Race</div>
            <div className="progress-bar"><div className="progress-fill"></div></div>
          </div>
          <div className="features">
            <div className="feature"><div className="feature-icon"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg></div><span className="feature-text">Enterprise-grade security & compliance</span></div>
            <div className="feature"><div className="feature-icon"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg></div><span className="feature-text">Track your brand vs. competitors in real-time</span></div>
            <div className="feature"><div className="feature-icon"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><span className="feature-text">Proven AI optimization strategies</span></div>
          </div>
        </div>
        <div className="login-section">
          <div className="demo-banner">Free Demo</div>
          <div className="form-header">
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isSignUp ? 'Start your AI visibility journey today' : 'Sign in to your Vizup dashboard'}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label className="form-label" htmlFor="email">Email Address</label><div className="input-wrapper"><span className="input-icon"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></span><input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="Enter your email" disabled={loading} autoComplete="email" /></div></div>
            <div className="form-group"><label className="form-label" htmlFor="password">{isSignUp ? 'Create Password' : 'Password'}</label><div className="input-wrapper"><span className="input-icon"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></span><input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange} className="form-input" placeholder={isSignUp ? 'Create a secure password' : 'Enter your password'} disabled={loading} autoComplete={isSignUp ? 'new-password' : 'current-password'} /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg></button></div></div>
            {isSignUp && (
              <div className="form-group"><label className="form-label" htmlFor="confirmPassword">Confirm Password</label><div className="input-wrapper"><span className="input-icon"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></span><input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleInputChange} className="form-input" placeholder="Confirm your password" disabled={loading} autoComplete="new-password" /><button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg></button></div></div>
            )}
            {!isSignUp && (
              <div className="form-options"><div className="checkbox-wrapper"><input type="checkbox" id="remember" /><label htmlFor="remember">Remember me</label></div><button type="button" className="forgot-link" onClick={async()=>{ if(!formData.email){ setLocalError('Enter your email to reset password'); return } const { error } = await auth.resetPassword(formData.email); if(error){ setLocalError(error.message||'Reset failed') } else { setSuccessMessage('Password reset email sent') } }}>Forgot password?</button></div>
            )}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (isSignUp ? 'Creating Account…' : 'Signing in…') : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
            {currentError && <div className="alert alert-error mt-4">{currentError}</div>}
            {successMessage && <div className="alert alert-success mt-4">{successMessage}</div>}
            <div className="divider"><div className="divider-line"></div><span className="divider-text">OR</span><div className="divider-line"></div></div>
            <div className="social-login"><button type="button" className="social-btn" onClick={()=>auth.signInWithProvider('google')}>Google</button><button type="button" className="social-btn" onClick={()=>auth.signInWithProvider('linkedin')}>LinkedIn</button></div>
            <div className="signup-link">
              {isSignUp ? (
                <>Already have an account? <button type="button" className="linklike" onClick={toggleAuthMode}>Sign in</button></>
              ) : (
                <>Don't have an account? <button type="button" className="linklike" onClick={toggleAuthMode}>Sign up for free</button></>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
