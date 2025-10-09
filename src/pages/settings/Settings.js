import React from 'react'
import '../../styles/settings.css'

export default function Settings() {
  return (
    <div className="set-root">
      <div className="set-card">
        <h1 className="set-title">Settings</h1>
        <div className="set-section">
          <div className="set-label">Theme</div>
          <div className="set-value">Monochrome (locked)</div>
        </div>
        <div className="set-section">
          <div className="set-label">Notifications</div>
          <div className="set-value">Enabled</div>
        </div>
        <div className="set-section">
          <div className="set-label">Data Region</div>
          <div className="set-value">US</div>
        </div>
      </div>
    </div>
  )
}



