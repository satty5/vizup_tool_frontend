import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../../styles/header.css'
import { useAuth } from '../../hooks/useAuth'

export default function Header() {
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="app-header">
      <div className="app-header-content">
        <Link to="/" className="app-logo">
          <div className="app-logo-icon">V</div>
          <span>VIZUP</span>
        </Link>
        <nav className="app-nav">
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/monitor" className={({isActive}) => isActive ? 'active' : ''}>Monitoring</NavLink>
          <NavLink to="/diagnose" className={({isActive}) => isActive ? 'active' : ''}>Diagnosis</NavLink>
          <NavLink to="/optimize" className={({isActive}) => isActive ? 'active' : ''}>Optimise</NavLink>
          <NavLink to="/attribute" className={({isActive}) => isActive ? 'active' : ''}>Attribute</NavLink>
        </nav>
        <div className="app-right">
          <Link to="/settings" className="app-icon-btn" title="Settings">⚙️</Link>
          <button className="app-user" onClick={() => setMenuOpen(v => !v)}>
            <div className="app-avatar">{(user?.email?.[0] || 'D').toUpperCase()}</div>
          </button>
          {menuOpen && (
            <div className="app-menu" onMouseLeave={() => setMenuOpen(false)}>
              <div className="app-menu-item">{user?.email || 'demo@vizup.com'}</div>
              <Link to="/profile" className="app-menu-item">Profile</Link>
              <button className="app-menu-item" onClick={() => signOut()}>Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


